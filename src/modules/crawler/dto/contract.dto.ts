import { LogEventDto } from './log-event-crawler.dto';
export class ContractDto {
  abi: any[];
  contractAddress: string;
  rpc: string;
  firstCrawlBlock: number;
  contractName: string;
  maxRange: number;
}

export class GetBlockDto {
  lateBlockInSC: number;
  blockInDB: number;
}
export class IEventLogCrawlerOptions {
  eventLogs: LogEventDto;
  lastBlockNumber: number;
}
