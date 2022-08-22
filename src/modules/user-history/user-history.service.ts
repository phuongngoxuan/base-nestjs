import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHistoryRepository } from '../../models/repositories/user-history.repository';
import { UserHistoryEntity } from '../../models/entities/user-history.entity';
import { QueryUserHistoryDto } from './dto/query-history-user.dto';
import { EventStake } from '../event/dto/event-stake.dto';
import { EventClaimRewardDto } from '../event/dto/event-claim-reward.dto';
import { eventsName } from '../crawler/config/crawler.config';
import { EventSetTier } from '../event/dto/event-set-tiers.dto';
import { EventUnStake } from '../event/dto/event-unstake.dto';
import { EventSetStartStake } from '../event/dto/event-set-start-stake.dto';
import { EventClaimMultipleRewardDto } from 'src/modules/event/dto/event-claim-multiple-reward.dto';

@Injectable()
export class UserHistoryService {
  constructor(
    @InjectRepository(UserHistoryRepository, 'default')
    private userHistoryRepository: UserHistoryRepository,
  ) {}

  async getUserHistory(query: QueryUserHistoryDto) {
    return await this.userHistoryRepository.getHistoryUser(query);
  }

  async findTransactionHash(
    txHash: string,
    logIndex: number,
  ): Promise<UserHistoryEntity> {
    return await this.userHistoryRepository.findOne({
      where: { txHash, logIndex },
    });
  }
}
