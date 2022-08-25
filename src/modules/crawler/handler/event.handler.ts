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
import { EventClaimBaseRewards } from '../dto/event-claim-base-rewards.dto';
import { UserInfoRepository } from '../../../models/repositories/user-info.repository';
import { isBuffer } from 'util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
@Injectable()
export class HandlerEvent {
  constructor(
    @InjectRepository(UserHistoryRepository)
    private userHistoryRepository: UserHistoryRepository,
    @InjectRepository(UserInfoRepository)
    private userInfoRepository: UserInfoRepository,
  ) {}
  // crawler event eth
  async handlerBaseSC(events: LogEventDto[]): Promise<void> {
    for (const eventInfo of events) {
      const { address, blockNumber, logIndex, transactionHash, event } =
        eventInfo;
      console.log(eventInfo.transactionHash);
      console.log(eventInfo.logIndex);
      // check duplicate event

      const eventHistory = await this.userHistoryRepository.findOne({
        where: { txHash: transactionHash, logIndex },
      });

      if (!eventHistory) {
        const blockTimestamp = await this.getBlockTimestamp(
          blockNumber,
          process.env.RPC,
        );

        // information is common to all events
        const newUserHistory = new UserHistoryEntity();
        newUserHistory.action = event;
        newUserHistory.logIndex = logIndex;
        newUserHistory.txHash = transactionHash;
        newUserHistory.blockNumber = blockNumber;
        newUserHistory.from = address;
        newUserHistory.blockTimestamp = blockTimestamp;
        newUserHistory.data = JSON.stringify(eventInfo);
        console.log(eventInfo);

        /*
         * Data information format for each event
         */
        switch (event) {
          case eventsName.boost: // user: address, pid: uint256, tokenId: uint256 event Boost
            const eventBoost = eventInfo as EventBoost;
            const valueEventBoost = eventBoost.returnValues;
            newUserHistory.poolId = valueEventBoost.pid;
            newUserHistory.to = valueEventBoost.user;
            newUserHistory.userAddress = valueEventBoost.user;
            break;
          case eventsName.deposit: // user: address, pid: uint256, amount:uint256 Deposit
            const eventDeposit = eventInfo as EventDeposit;
            const valueEventDeposit = eventDeposit.returnValues;
            newUserHistory.poolId = valueEventDeposit.pid;
            newUserHistory.to = valueEventDeposit.user;
            newUserHistory.userAddress = valueEventDeposit.user;
            break;
          case eventsName.claimBaseRewards: // user: address, pid:string, amount:string
            const eventClaimBaseRewards = eventInfo as EventClaimBaseRewards;
            const valueEventClaim = eventClaimBaseRewards.returnValues;
            newUserHistory.poolId = valueEventClaim.pid;
            newUserHistory.to = valueEventClaim.user;
            newUserHistory.userAddress = valueEventClaim.user;
            break;
          default:
            break;
        }

        // check userAddress
        if (newUserHistory.userAddress) {
          const userInfo = await this.userInfoRepository.findOne({
            where: { userAddress: newUserHistory.userAddress },
          });

          if (!userInfo) {
            const userInfo = await this.userInfoRepository.save({
              userAddress: newUserHistory.userAddress,
            });
          } else {
            newUserHistory.userId = userInfo.id;
            // save userHistory
            await this.userHistoryRepository.save(newUserHistory);
            console.log('create history');
          }
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
