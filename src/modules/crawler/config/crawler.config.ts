import { abiBase } from '../../../abis/Base.json';

export const baseContractInfo = {
  abi: abiBase, // file abi.json
  contractAddress: process.env.BASE_CONTRACT_ADDRESS, // contract address
  rpc: process.env.RPC,
  firstCrawlBlock: Number(process.env.FIRST_CRAWLER_BLOCK), // block start crawler transaction in smart contract
  contractName: 'base_staking_history', // name the contract to use differently if the crawler has more than one sc
  maxRange: Number(process.env.MAX_RANGE) || 1000, // block distance
};

export const eventsName = {
  claimReward: 'ClaimReward',
  stake: 'Stake',
  unStake: 'Unstake',
  claimMultipleReward: 'ClaimMultipleReward',
  boost: 'Boost',
  deposit: 'Deposit',
};
