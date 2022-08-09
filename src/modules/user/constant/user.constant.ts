import BigNumber from 'bignumber.js';

export const Tier = {
  NORANK: 0,
  BRONZE: 1,
  SILVER: 2,
  GOLD: 3,
};
export const MIN_TIME_SILVER = 50;
export const MIN_TIME_GOLD = 100;

export const USDC_THRESHOLD = new BigNumber('1000000000');
export const SILVER_PIVOT = new BigNumber('4320000');
export const GOLD_PIVOT = SILVER_PIVOT.times(2);
