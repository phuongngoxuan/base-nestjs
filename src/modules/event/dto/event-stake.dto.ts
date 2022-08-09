interface Result {
  '0': string;
  '1': string;
  '2': string;
  sender: string;
  amount: string;
  startStake: string;
}
export class EventStake {
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
