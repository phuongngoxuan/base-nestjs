import { Injectable } from '@nestjs/common';
import { LogEventDto } from '../dto/log-event-crawler.dto';
import { nameEvents } from '../config/crawler.config';
import { EventService } from '../../event/event.service';
import { EventStake } from '../../event/dto/event-stake.dto';
import { EventUnStake } from '../../event/dto/event-unstake.dto';
import { EventClaimRewardDto } from 'src/modules/event/dto/event-claim-reward.dto';
import { ReadScService } from '../../read-sc/read-sc.service';

@Injectable()
export class HandlerEvent {
  constructor(
    private eventService: EventService,
    private readScService: ReadScService,
  ) {}
  // crawler event eth
  async handlerAllEvents(events: LogEventDto[]): Promise<void> {
    for (const event of events) {
      switch (event.event) {
        case nameEvents.stake:
          const eventStake = event as EventStake;
          await this.eventService.createEventHistory(eventStake);
          break;
        case nameEvents.unStake:
          const eventUnStake = event as EventUnStake;
          await this.eventService.createEventHistory(eventUnStake);
          break;
        case nameEvents.claimReward:
          const eventClaimReward = event as EventClaimRewardDto;
          const { timestamp } = await this.readScService.getBlockInfo(
            event.blockNumber,
            process.env.RPC,
          );
          await this.eventService.eventClaimReward(eventClaimReward, timestamp);
          break;
        default:
          break;
      }
    }
  }
}
