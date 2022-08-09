import { abiBase } from '../../../abis/Base.json';

export const baseContract = {
  abi: abiBase,
  contract_address: process.env.BASE_CONTRACT_ADDRESS,
  rpc: process.env.RPC,
  first_crawl_block: Number(process.env.FIRST_BLOCK_CRAWLER),
  contractName: 'base',
};

export const maxRange = 3499;

export const nameEvents = {
  claimReward: 'ClaimReward',
  stake: 'Stake',
  unStake: 'Unstake',
  claimMultipleReward: 'ClaimMultipleReward',
};

export const eventNames = {};

export const topics = {};
