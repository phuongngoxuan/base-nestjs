import { ContractDto } from '../dto/contract.dto';
import { CrawlStatusRepository } from '../../../models/repositories/crawler.repository';
import { CrawlStatus } from '../../../models/entities/crawler-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LogEventDto } from '../dto/log-event-crawler.dto';
import { BlockInfoDto } from '../../read-sc/dto/bock-infos.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
const web3Provider = new Web3.providers.HttpProvider(process.env.RPC);
const web3 = new Web3(web3Provider);

@Injectable()
export class CrawlUtils {
  constructor(
    @InjectRepository(CrawlStatusRepository)
    private crawlStatusRepository: CrawlStatusRepository,
  ) {}

  async getBlockNumber(contract: ContractDto): Promise<number> {
    const { contractName } = contract;
    const log = await this.crawlStatusRepository.findOne({
      where: { contractName },
    });

    if (!log) {
      const crawl = new CrawlStatus();
      crawl.contractAddress = contract.contract_address;
      crawl.blockNumber = contract.first_crawl_block;
      crawl.contractName = contract.contractName;
      const timeStamp = await this.getBlockTimestamp(
        crawl.blockNumber,
        contract.rpc,
      );
      crawl.blockTimestamp = timeStamp;
      await this.crawlStatusRepository.save(crawl, { reload: false });
      return crawl.blockNumber;
    } else {
      return Number(log.blockNumber);
    }
  }

  async crawlEvent(
    fromBlockNumber: number,
    toBlockNumber: number,
    contract: ContractDto,
  ): Promise<LogEventDto[]> {
    const web3Provider = new Web3.providers.HttpProvider(contract.rpc);
    const web3 = new Web3(web3Provider);
    const contractWeb3 = new web3.eth.Contract(
      contract.abi,
      contract.contract_address,
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

  async getLateBlock(config: ContractDto): Promise<number> {
    const web3Provider = new Web3.providers.HttpProvider(config.rpc);
    const web3 = new Web3(web3Provider);
    const lateBlock = await web3.eth.getBlockNumber();
    return lateBlock - 3;
  }

  async getBlockTimestamp(block: number, rpc: string): Promise<number> {
    const web3Provider = new Web3.providers.HttpProvider(rpc);
    const web3 = new Web3(web3Provider);
    // Get block can false not good for performance (pending)
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
