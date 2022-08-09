interface Result {
  account: string;
  tier: number;
}
export class EventSetTier {
  address: string;
  blockHash: string;
  blockNumber: number;
  logIndex: number;
  removed: boolean;
  transactionHash: string;
  transactionIndex: number;
  id: string;
  returnValues: Result;
  event: string;
  signature: string;
  raw: {
    data: string;
    topics: [];
  };
}
