import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LogEventDto } from '../dto/log-event-crawler.dto';
import { eventsName } from '../config/crawler.config';
import { EventService } from '../../event/event.service';
import { EventStake } from '../../event/dto/event-stake.dto';
import { EventUnStake } from '../../event/dto/event-unstake.dto';
import { ReadScService } from '../../read-sc/read-sc.service';
import { UserHistoryRepository } from '../../../models/repositories/user-history.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHistoryEntity } from '../../../models/entities/user-history.entity';
import { BlockInfoDto } from '../../read-sc/dto/bock-infos.dto';
import { EventDeposit } from '../dto/event-deposit.dto';
import { EventBoost } from '../dto/event-boost.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
@Injectable()
export class HandlerEvent {
  constructor(
    @InjectRepository(UserHistoryRepository)
    private userHistoryRepository: UserHistoryRepository,
  ) {}
  // crawler event eth
  async handlerBaseSC(events: LogEventDto[]): Promise<void> {
    for (const eventInfo of events) {
      const { address, blockNumber, logIndex, transactionHash, event } =
        eventInfo;
      // check duplicate event
      const eventHistory = await this.userHistoryRepository.findOne({
        where: [{ txHash: transactionHash }, { blockNumber }],
      });
      console.log(
        '-----------------------------------------------------------------------------------',
      );
      if (!eventHistory) {
        const blockTimestamp = await this.getBlockTimestamp(
          blockNumber,
          process.env.RPC,
        );
        const newUserHistory = new UserHistoryEntity();
        newUserHistory.action = event;
        newUserHistory.logIndex = logIndex;
        newUserHistory.txHash = transactionHash;
        newUserHistory.blockNumber = blockNumber;
        newUserHistory.from = address;
        newUserHistory.blockTimestamp = blockTimestamp;

        switch (event) {
          case eventsName.boost: // user: address, pid: uint256, tokenId: uint256 event Boost
            const eventBoost = eventInfo as EventBoost;
            break;
          case eventsName.deposit: //user: address, pid: uint256, amount:uint256 Deposit
            const eventDeposit = eventInfo as EventDeposit;
            break;
          case eventsName.claimReward:
            break;
          default:
            break;
        }
      }
    }
  }

  // get time in block
  async getBlockTimestamp(block: number, rpc: string): Promise<number> {
    const web3Provider = new Web3.providers.HttpProvider(rpc);
    const web3 = new Web3(web3Provider);

    // Get block can false in testnet not good for performance (pending)
    for (let i = 0; i < 100; i++) {
      const blockInfo: BlockInfoDto = await web3.eth.getBlock(block);
      if (blockInfo) return blockInfo.timestamp;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `Couldn't find blockInfo`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
