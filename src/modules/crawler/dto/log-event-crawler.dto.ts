// eslint-disable-next-line @typescript-eslint/no-empty-interface
export class ReturnValues {}

export class LogEventDto {
  address: string;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  logIndex: number;
  removed: boolean;
  id: string;
  returnValues: ReturnValues;
  event: string;
  signature: string;
}
