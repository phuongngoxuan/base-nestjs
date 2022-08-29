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
import { map } from 'rxjs/operators';
import { Any } from 'typeorm';
const db = process.env.MYSQL_DATABASE;

@Injectable()
export class UserHistoryService {
  constructor(
    @InjectRepository(UserHistoryRepository, 'default')
    private userHistoryRepository: UserHistoryRepository,
  ) {}

  async getUserHistory(query: QueryUserHistoryDto) {
    const userHistories = await this.userHistoryRepository.getHistoryUser(
      query,
    );

    // format data
    userHistories.data = userHistories.data.map((history) => {
      const user = { id: history.id, userAddress: history.userAddress };
      const newHistory = history as any;
      newHistory.user = user;

      return { ...newHistory };
    });

    return userHistories;
  }

  async findTransactionHash(
    txHash: string,
    logIndex: number,
  ): Promise<UserHistoryEntity[]> {
    const history = await this.userHistoryRepository.query(
      `SELECT * FROM user_histories LEFT JOIN ${db}.user_infos AS userInfo ON ${db}.userInfo.id = user_histories.user_id
      `,
    );

    return history;
  }
}
