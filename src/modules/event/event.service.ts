import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EventClaimRewardDto } from './dto/event-claim-reward.dto';
import { UserHistoryService } from '../user-history/user-history.service';
import { ReadScService } from '../read-sc/read-sc.service';

@Injectable()
export class EventService {
  constructor(
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
  }
}
