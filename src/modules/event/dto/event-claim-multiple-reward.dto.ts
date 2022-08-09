interface Result {
  '0': string;
  '1': string;
  '2': string;
  sender: string;
  signature: string;
  chainId: string;
}
export class EventClaimMultipleRewardDto {
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
