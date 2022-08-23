import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrawlStatusRepository } from '../../models/repositories/crawler.repository';
import { ContractDto, GetBlockDto } from './dto/contract.dto';
import { HandlerEvent } from './handler/event.handler';
import { LogEventDto } from './dto/log-event-crawler.dto';
import { BlockInfoDto } from './../read-sc/dto/bock-infos.dto';
import { eventsName, baseContractInfo } from './config/crawler.config';
import { CrawlStatus } from '../../models/entities/crawler-status.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
@Injectable()
export class CrawlerService {
  constructor(
    @InjectRepository(CrawlStatusRepository)
    private crawlStatusRepository: CrawlStatusRepository,
    private handlerEvent: HandlerEvent,
  ) {}
  passed = true;
  // function crawler can be reused many times with parameter contractInfo
  async start(contractInfo: ContractDto): Promise<void> {
    await this.rootControllerCrawl(contractInfo);
  }

  async rootControllerCrawl(contractInfo: ContractDto): Promise<void> {
    while (this.passed) {
      this.passed = false;
      const { lateBlockInSC, blockInDB } = await this.getBlockSCAndBlockDB(
        contractInfo,
      );
      // check block validate
      const isValidate: boolean = this.isBlockValid(lateBlockInSC, blockInDB);
      if (isValidate != false) {
        await this.crawlerController(blockInDB, lateBlockInSC, contractInfo);
      }
      this.passed = true;
    }
  }

  async getBlockSCAndBlockDB(Contract: ContractDto): Promise<GetBlockDto> {
    const [lateBlockInSC, blockInDB] = await Promise.all([
      this.getLateBlock(Contract),
      this.getBlockNumberInDB(Contract),
    ]);
    return { lateBlockInSC, blockInDB };
  }

  // check block valid
  isBlockValid(lateBlockInSC: number, blockInDB: number): boolean {
    if (blockInDB >= lateBlockInSC) {
      console.log('----------Waiting for new blocks----------');
      return false;
    } else {
      return true;
    }
  }

  async crawlerController(
    blockInDB: number,
    lateBlockInSC: number,
    contractInfo: ContractDto,
  ): Promise<void> {
    const fromBlock: number = blockInDB;
    const toBlock: number = this.getToBlock(
      lateBlockInSC,
      blockInDB,
      contractInfo.maxRange,
    );
    const events = await this.crawlEvent(fromBlock, toBlock, contractInfo);
    await this.handlerContract(contractInfo, events);
    await this.updateBlockCrawlSuccess(toBlock, contractInfo);
  }

  async handlerContract(
    contract: ContractDto,
    events: LogEventDto[],
  ): Promise<void> {
    // filter smart contract
    switch (contract.contractName) {
      case baseContractInfo.contractName:
        await this.handlerEvent.handlerBaseSC(events);
        break;
      default:
        break;
    }
  }

  async updateBlockCrawlSuccess(
    toBlock: number,
    contract: ContractDto,
  ): Promise<void> {
    const blockNumber = Number(toBlock);
    const blockTimestamp = await this.getBlockTimestamp(
      blockNumber,
      contract.rpc,
    );

    await this.crawlStatusRepository.update(
      { contractName: contract.contractName },
      { blockNumber, blockTimestamp },
    );
    console.log('update block new block--' + toBlock);
  }

  // calculate toBlock number
  getToBlock(
    lateBlockInSC: number,
    blockInDB: number,
    maxRange: number,
  ): number {
    if (lateBlockInSC - blockInDB < maxRange) {
      return lateBlockInSC;
    } else {
      return blockInDB + maxRange;
    }
  }

  // get block number in db
  async getBlockNumberInDB(contract: ContractDto): Promise<number> {
    const { contractName } = contract;
    const log = await this.crawlStatusRepository.findOne({
      where: { contractName },
    });

    if (!log) {
      const crawl = new CrawlStatus();
      crawl.contractAddress = contract.contractAddress;
      crawl.blockNumber = contract.firstCrawlBlock;
      crawl.contractName = contract.contractName;
      //get timestamp at current block
      const timeStamp = await this.getBlockTimestamp(
        contract.firstCrawlBlock,
        contract.rpc,
      );
      crawl.blockTimestamp = timeStamp;
      // create new record crawlerInfo in database
      await this.crawlStatusRepository.save(crawl, { reload: false });
      return crawl.blockNumber;
    } else {
      return Number(log.blockNumber);
    }
  }

  // get logs fromBlock toBlock input
  async crawlEvent(
    fromBlockNumber: number,
    toBlockNumber: number,
    contract: ContractDto,
  ): Promise<LogEventDto[]> {
    const web3Provider = new Web3.providers.HttpProvider(contract.rpc);
    const web3 = new Web3(web3Provider);
    const contractWeb3 = new web3.eth.Contract(
      contract.abi,
      contract.contractAddress,
    );

    const eventLogs: LogEventDto[] = await contractWeb3.getPastEvents(
      'allEvents',
      {
        fromBlock: fromBlockNumber,
        toBlock: toBlockNumber,
      },
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );
    return eventLogs;
  }

  // get late block - 1
  async getLateBlock(config: ContractDto): Promise<number> {
    const web3Provider = new Web3.providers.HttpProvider(config.rpc);
    const web3 = new Web3(web3Provider);
    const lateBlock = await web3.eth.getBlockNumber();
    return lateBlock - 1;
  }

  // get time in block
  async getBlockTimestamp(block: number, rpc: string): Promise<number> {
    const web3Provider = new Web3.providers.HttpProvider(rpc);
    const web3 = new Web3(web3Provider);

    // Get block can false in testnet not good for performance (pending)
    for (let i = 0; i < 100; i++) {
      const blockInfo: BlockInfoDto = await web3.eth.getBlock(block);
      if (blockInfo) return blockInfo.timestamp;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `Couldn't find blockInfo`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
