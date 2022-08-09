import { Injectable } from '@nestjs/common';
import BigNumber from 'bignumber.js';
import { LogEventDto } from '../../crawler/dto/log-event-crawler.dto';
import { EventStake } from '../dto/event-stake.dto';
import { UserInfoReduceDto } from '../dto/user-info-reduce.dto';

@Injectable()
export class EventUtils {
  async userData(
    event: LogEventDto[],
    nameEvent: string,
  ): Promise<UserInfoReduceDto[]> {
    return event.reduce(function (filtered, event) {
      if (event.event === nameEvent) {
        const eventConvert = event as EventStake; // dto Stake same field dto Unstake
        const newValue = {
          address: eventConvert.returnValues.sender,
          amount: new BigNumber(eventConvert.returnValues.amount),
          startStake: eventConvert.returnValues.startStake,
          txHash: eventConvert.transactionHash,
          logIndex: eventConvert.logIndex,
        };
        filtered.push(newValue);
      }
      return filtered;
    }, []);
  }
}
