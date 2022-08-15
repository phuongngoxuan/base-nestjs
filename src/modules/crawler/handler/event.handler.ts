import { Injectable } from '@nestjs/common';
import { LogEventDto } from '../dto/log-event-crawler.dto';
import { eventsName } from '../config/crawler.config';
import { EventService } from '../../event/event.service';
import { EventStake } from '../../event/dto/event-stake.dto';
import { EventUnStake } from '../../event/dto/event-unstake.dto';
import { ReadScService } from '../../read-sc/read-sc.service';

@Injectable()
export class HandlerEvent {
  constructor(
    private eventService: EventService,
    private readScService: ReadScService,
  ) {}
  // crawler event eth
  async handlerBaseSC(events: LogEventDto[]): Promise<void> {
    for (const event of events) {
      switch (event.event) {
        case eventsName.stake:
          const eventStake = event as EventStake;
          break;
        case eventsName.unStake:
          const eventUnStake = event as EventUnStake;
          break;
        case eventsName.claimReward:
          break;
        default:
          break;
      }
    }
  }
}
