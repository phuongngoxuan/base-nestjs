import { baseContract } from './config/crawler.config';
import { Injectable } from '@nestjs/common';
import { CrawlUtils } from './utils/crawler-utils';
import { InjectRepository } from '@nestjs/typeorm';
import { CrawlStatusRepository } from '../../models/repositories/crawler.repository';
import { ContractDto, GetBlockDto } from './dto/contract.dto';
import { HandlerEvent } from './handler/event.handler';
import { LogEventDto } from './dto/log-event-crawler.dto';
@Injectable()
export class CrawlerService {
  constructor(
    @InjectRepository(CrawlStatusRepository)
    private crawlStatusRepository: CrawlStatusRepository,
    private handlerEvent: HandlerEvent,
    private crawlUtils: CrawlUtils,
  ) {}

  async start(contractInfo: ContractDto): Promise<void> {
    await this.rootControllerCrawl(contractInfo);
  }

  async rootControllerCrawl(contract: ContractDto): Promise<void> {
    while (true) {
      const { lateBlockSC, getBlockDB } = await this.getBlockSCAndBlockDB(
        contract,
      );
      const checkBlock: boolean = this.checkBlockValid(lateBlockSC, getBlockDB);
      if (checkBlock != false) {
        await this.crawlerController(getBlockDB, lateBlockSC, contract);
      }
    }
  }

  async getBlockSCAndBlockDB(Contract: ContractDto): Promise<GetBlockDto> {
    const [lateBlockSC, getBlockDB] = await Promise.all([
      this.crawlUtils.getLateBlock(Contract),
      this.crawlUtils.getBlockNumber(Contract),
    ]);
    return { lateBlockSC, getBlockDB };
  }

  checkBlockValid(lateBlockSC: number, getBlockDB: number): boolean {
    if (getBlockDB >= lateBlockSC) {
      console.log('----------Waiting for new blocks----------');
      return false;
    } else {
      return true;
    }
  }

  async crawlerController(
    getBlockDB: number,
    lateBlockSC: number,
    contract: ContractDto,
    maxRange?: number,
  ): Promise<void> {
    const fromBlock: number = getBlockDB;
    if (!maxRange) {
      maxRange = parseInt(process.env.MAX_RANGE, 10);
    }
    const toBlock: number = this.getToBlock(lateBlockSC, getBlockDB, maxRange);
    const events = await this.crawlUtils.crawlEvent(
      fromBlock,
      toBlock,
      contract,
    );
    await this.handlerEvents(contract, events);
    await this.updateBlockCrawlSuccess(toBlock, contract);
  }

  async handlerEvents(
    contract: ContractDto,
    events: LogEventDto[],
  ): Promise<void> {
    switch (contract.contractName) {
      case baseContract.contractName:
        await this.handlerEvent.handlerAllEvents(events);
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
    const blockTimestamp = await this.crawlUtils.getBlockTimestamp(
      blockNumber,
      contract.rpc,
    );
    await this.crawlStatusRepository.update(
      { contractName: contract.contractName },
      { blockNumber, blockTimestamp },
    );
    console.log('update block new block--' + toBlock);
  }

  getToBlock(
    lateBlockSC: number,
    getBlockDB: number,
    maxRange: number,
  ): number {
    if (lateBlockSC - getBlockDB < maxRange) {
      return lateBlockSC;
    } else {
      return getBlockDB + maxRange;
    }
  }
}
