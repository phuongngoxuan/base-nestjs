import { UserInfoRepository } from '../../models/repositories/user-info.repository';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventStake } from 'src/modules/event/dto/event-stake.dto';
import { EventUnStake } from '../event/dto/event-unstake.dto';
import { QueryUserInfoDto } from './dto/query-user.dto';
import { ResGetUserType } from './type/res-get-user.type';
import { ResGetTierUserType } from './type/res-tier-user.type';
import { UserInfoEntity } from '../../models/entities/user-info.entity';
import { UserUtils } from './utils/user.utils';
import { getTier } from 'src/modules/user/user.helper';
import { Tier } from 'src/modules/user/constant/user.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfoRepository, 'default')
    private userInfoRepository: UserInfoRepository,
    private userUtils: UserUtils,
  ) {}

  async getTier(): Promise<ResGetTierUserType> {
    const now = Math.floor(new Date().getTime() / 1000);
    const [noRank, bronze, silver, gold] = await Promise.all([
      this.userInfoRepository.findAndCount({ startStake: '0' }),
      this.userInfoRepository.countUserTier(Tier.BRONZE, now),
      this.userInfoRepository.countUserTier(Tier.SILVER, now),
      this.userInfoRepository.countUserTier(Tier.GOLD, now),
    ]);

    const holdersTotal = bronze + silver + gold;
    const tiers = [
      {
        tier: Number(Tier.NORANK),
        holders: noRank[1],
      },
      {
        tier: Number(Tier.BRONZE),
        holders: bronze,
      },
      {
        tier: Number(Tier.SILVER),
        holders: silver,
      },
      {
        tier: Number(Tier.GOLD),
        holders: gold,
      },
    ];

    return {
      holdersTotal,
      tiers,
    };
  }

  async getUsers(queryUserDto: QueryUserInfoDto): Promise<ResGetUserType> {
    const [now, { data, ...result }] = await Promise.all([
      this.userUtils.getTimeNow(),
      this.userInfoRepository.getUsers(queryUserDto),
    ]);

    const userConvert = data.map((user) => {
      const tier = getTier(user.startStake, now.toString());
      return { ...user, tier };
    });
    return { ...result, data: userConvert };
  }

  async createUser(user: UserDto): Promise<void> {
    await this.userInfoRepository.save(user);
  }

  async updateUser(user: UserDto): Promise<void> {
    await this.userInfoRepository.update(
      { userAddress: user.userAddress },
      user,
    );
  }

  async updateStartTimeUser(
    userAddress: string,
    startStake: string,
  ): Promise<void> {
    await this.userInfoRepository.update({ userAddress }, { startStake });
  }

  async createNewUser(user: UserInfoEntity): Promise<void> {
    await this.userInfoRepository.save(user);
  }

  async findUserAddress(userAddress: string): Promise<UserInfoEntity> {
    return await this.userInfoRepository.findOne({ userAddress });
  }

  async updateUserEventStake(
    user: UserInfoEntity,
    event: EventStake,
  ): Promise<void> {
    user.amount = (
      BigInt(user.amount) + BigInt(event.returnValues.amount)
    ).toString();
    await this.updateUser(user);
  }
  async updateUserEventUnStake(
    user: UserInfoEntity,
    event: EventUnStake,
  ): Promise<void> {
    user.amount = (
      BigInt(user.amount) - BigInt(event.returnValues.amount)
    ).toString();
    await this.updateUser(user);
  }

  async createUserEventStake(event: EventStake): Promise<void> {
    const newUser = new UserInfoEntity();
    newUser.amount = event.returnValues.amount;
    newUser.userAddress = event.returnValues.sender;
    newUser.startStake = event.returnValues.startStake;
    await this.userInfoRepository.save(newUser);
  }
}
