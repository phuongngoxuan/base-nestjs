import { CrawlStatusRepository } from '../../../models/repositories/crawler.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { baseContract } from '../../crawler/config/crawler.config';
import {
  Tier,
  MIN_TIME_SILVER,
  MIN_TIME_GOLD,
} from 'src/modules/user/constant/user.constant';

export class UserUtils {
  constructor(
    @InjectRepository(CrawlStatusRepository, 'default')
    private crawlStatusRepository: CrawlStatusRepository,
  ) {}
  async convertTierToStartStake(tier: number): Promise<number> {
    const now = await this.getTimeNow();
    if (tier == Tier.NORANK) {
      return 0;
    }
    if (tier == Tier.BRONZE) {
      return now;
    }
    if (tier == Tier.SILVER) {
      return now - MIN_TIME_SILVER * 60 * 60 * 24;
    }
    if (tier == Tier.GOLD) {
      return now - MIN_TIME_GOLD * 60 * 60 * 24;
    }
  }

  public async getTimeNow(): Promise<number> {
    const crawlerInfo = await this.crawlStatusRepository.findOne({
      contractName: baseContract.contractName,
    });
    return crawlerInfo.blockTimestamp;
  }
}
