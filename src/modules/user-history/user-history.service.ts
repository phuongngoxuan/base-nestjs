import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHistoryRepository } from '../../models/repositories/user-history.repository';
import { EventStake } from '../event/dto/event-stake.dto';
import { UserHistoryEntity } from '../../models/entities/user-history.entity';
import { EventClaimRewardDto } from '../event/dto/event-claim-reward.dto';
import { QueryUserHistoryDto } from './dto/query-history-user.dto';
import { symbol, type } from './constant.ts/user-history.constant';
import { nameEvents } from '../crawler/config/crawler.config';
import { PoolService } from '../pool/pool.service';
import { EventSetTier } from '../event/dto/event-set-tiers.dto';
import { EventUnStake } from '../event/dto/event-unstake.dto';
import { EventSetStartStake } from '../event/dto/event-set-start-stake.dto';
import { EventClaimMultipleRewardDto } from 'src/modules/event/dto/event-claim-multiple-reward.dto';

@Injectable()
export class UserHistoryService {
  constructor(
    @InjectRepository(UserHistoryRepository, 'default')
    private userHistoryRepository: UserHistoryRepository,
    private poolService: PoolService,
  ) {}

  async getUserHistory(query: QueryUserHistoryDto) {
    return await this.userHistoryRepository.getHistoryUser(query);
  }

  async findTransactionHash(
    txHash: string,
    logIndex: string,
  ): Promise<UserHistoryEntity> {
    return await this.userHistoryRepository.findOne({ txHash, logIndex });
  }

  async createHistoryUser(
    event:
      | EventStake
      | EventClaimRewardDto
      | EventSetTier
      | EventUnStake
      | EventSetStartStake
      | EventClaimMultipleRewardDto,
    timestamp: number,
  ): Promise<void> {
    const newHistory = new UserHistoryEntity();

    newHistory.action = event.event;
    newHistory.lastBlock = event.blockNumber.toString();
    newHistory.txHash = event.transactionHash;
    newHistory.logIndex = event.logIndex.toString();
    newHistory.blockTimestamp = timestamp;

    switch (event.event) {
      case nameEvents.stake:
        break;
      case nameEvents.claimReward:
        break;
      case nameEvents.claimMultipleReward:
        break;
      case nameEvents.unStake:
        break;
      default:
        break;
    }
    await this.userHistoryRepository.save(newHistory);
  }
}
