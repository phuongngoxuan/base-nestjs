import { LogEventDto } from './log-event-crawler.dto';
export class ContractDto {
  abi: any[];
  contract_address: string;
  rpc: string;
  contractName: string;
  first_crawl_block: number;
}

export class GetBlockDto {
  lateBlockSC: number;
  getBlockDB: number;
}
export class IEventLogCrawlerOptions {
  eventLogs: LogEventDto;
  lastBlockNumber: number;
}
