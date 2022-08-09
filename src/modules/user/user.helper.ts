import BigNumber from 'bignumber.js';
import {
  GOLD_PIVOT,
  SILVER_PIVOT,
  Tier,
} from 'src/modules/user/constant/user.constant';

export function getTier(startStake: string, blockTime: string): number {
  if (startStake == '0') {
    return Tier.NORANK;
  }

  if (new BigNumber(startStake).plus(SILVER_PIVOT).gte(blockTime)) {
    return Tier.BRONZE;
  }
  if (new BigNumber(startStake).plus(GOLD_PIVOT).gte(blockTime)) {
    return Tier.SILVER;
  }

  return Tier.GOLD;
}
