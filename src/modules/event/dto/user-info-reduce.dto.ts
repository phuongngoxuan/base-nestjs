import BigNumber from 'bignumber.js';
export class UserInfoReduceDto {
  address: string;
  amount: BigNumber;
  startStake: string;
  txHash: string;
  logIndex: number;
}
