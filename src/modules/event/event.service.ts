import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EventStake } from './dto/event-stake.dto';
import { EventUnStake } from './dto/event-unstake.dto';
import { EventClaimRewardDto } from './dto/event-claim-reward.dto';
import { UserHistoryService } from '../user-history/user-history.service';
import { ReadScService } from '../read-sc/read-sc.service';
import { nameEvents } from '../crawler/config/crawler.config';
import { InjectRepository } from '@nestjs/typeorm';
import { PoolInfoRepository } from '../../models/repositories/pool-info.repository';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(PoolInfoRepository, 'default')
    private poolInfoRepository: PoolInfoRepository,
    private historyUserService: UserHistoryService,
    private readScService: ReadScService,
  ) {}

  // crawler event claim
  async eventClaimReward(
    event: EventClaimRewardDto,
    timestamp: number,
  ): Promise<void> {
    const txHash = event.transactionHash;
    const logIndex = event.logIndex.toString();
    const { sender, poolId } = event.returnValues;

    const [poolInfo, transactionHax] = await Promise.all([
      this.poolInfoRepository.findOne({
        id: Number(poolId),
      }),
      this.historyUserService.findTransactionHash(txHash, logIndex),
    ]);

    if (!poolInfo) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Couldn't find a pool to claim`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!transactionHax) {
      await this.historyUserService.createHistoryUser(event, timestamp);
    }
  }

  // create history event stake and unStake same fields response
  async createEventHistory(event: EventStake | EventUnStake): Promise<void> {
    const { transactionHash, logIndex } = event;

    const [CheckTransactionHash, { timestamp }] = await Promise.all([
      this.historyUserService.findTransactionHash(
        transactionHash,
        logIndex.toString(),
      ),
      this.readScService.getBlockInfo(event.blockNumber, process.env.RPC),
    ]);

    if (!CheckTransactionHash) {
      switch (event.event) {
        case nameEvents.stake:
          await this.historyUserService.createHistoryUser(event, timestamp);
          break;
        case nameEvents.unStake:
          await this.historyUserService.createHistoryUser(event, timestamp);
          break;
        default:
          break;
      }
    }
  }
}
