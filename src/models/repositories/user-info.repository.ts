import { EntityRepository, In, Repository } from 'typeorm';
import { QueryUserInfoDto } from '../../modules/user/dto/query-user.dto';
import { ResGetUserType } from '../../modules/user/type/res-get-user.type';
import {
  createUserInfoWithParam,
  UserInfoEntity,
} from 'src/models/entities/user-info.entity';
import {
  Tier,
  MIN_TIME_SILVER,
  MIN_TIME_GOLD,
} from 'src/modules/user/constant/user.constant';

@EntityRepository(UserInfoEntity)
export class UserInfoRepository extends Repository<UserInfoEntity> {
  async findUserAddress(userAddress: string): Promise<UserInfoEntity> {
    return await this.findOne({ userAddress });
  }

  async countUserTier(tier: number, now: number): Promise<number> {
    const builder = this.createQueryBuilder('user_infos');
    if (tier || tier == 0) {
      const maxStartStakeBronze = now;
      const maxStartStakeSilver = now - MIN_TIME_SILVER * 60 * 60 * 24;
      const maxStartStakeGold = now - MIN_TIME_GOLD * 60 * 60 * 24;
      switch (tier) {
        case Tier.NORANK:
          builder.andWhere('user_infos.startStake = :startStake', {
            startStake: 0,
          });
          break;
        case Tier.BRONZE:
          builder
            .andWhere(
              'user_infos.startStake > :maxStartStakeSilver  AND  user_infos.startStake < :maxStartStakeBronze',
              {
                maxStartStakeSilver,
                maxStartStakeBronze,
              },
            )
            .andWhere('user_infos.startStake != :startStake', {
              startStake: 0,
            });
          break;
        case Tier.SILVER:
          builder
            .andWhere(
              'user_infos.startStake > :maxStartStakeGold  AND  user_infos.startStake <= :maxStartStakeSilver',
              {
                maxStartStakeGold,
                maxStartStakeSilver,
              },
            )
            .andWhere('user_infos.startStake != :startStake', {
              startStake: 0,
            });
          break;
        case Tier.GOLD:
          builder
            .andWhere('user_infos.startStake <= :maxStartStakeGold', {
              maxStartStakeGold,
            })
            .andWhere('user_infos.startStake != :startStake', {
              startStake: 0,
            });
          break;

        default:
          break;
      }
    }

    return await builder.getCount();
  }

  async getUsers({
    account,
    tier,
    sort,
    page,
    limit,
    all,
  }: QueryUserInfoDto): Promise<ResGetUserType> {
    const builder = this.createQueryBuilder('user_infos');
    // search address
    if (account) {
      builder.where('user_infos.userAddress like :userAddress', {
        userAddress: `%${account}%`,
      });
    }
    const now = Math.floor(new Date().getTime() / 1000);

    if (tier || tier == 0) {
      const maxStartStakeBronze = now;
      const maxStartStakeSilver = now - MIN_TIME_SILVER * 60 * 60 * 24;
      const maxStartStakeGold = now - MIN_TIME_GOLD * 60 * 60 * 24;

      switch (tier) {
        case Tier.NORANK:
          builder.andWhere('user_infos.startStake = :startStake', {
            startStake: 0,
          });
          break;
        case Tier.BRONZE:
          builder
            .andWhere(
              'user_infos.startStake > :maxStartStakeSilver  AND  user_infos.startStake < :maxStartStakeBronze',
              {
                maxStartStakeSilver,
                maxStartStakeBronze,
              },
            )
            .andWhere('user_infos.startStake != :startStake', {
              startStake: 0,
            });
          break;
        case Tier.SILVER:
          builder
            .andWhere(
              'user_infos.startStake > :maxStartStakeGold  AND  user_infos.startStake <= :maxStartStakeSilver',
              {
                maxStartStakeGold,
                maxStartStakeSilver,
              },
            )
            .andWhere('user_infos.startStake != :startStake', {
              startStake: 0,
            });
          break;
        case Tier.GOLD:
          builder
            .andWhere('user_infos.startStake <= :maxStartStakeGold', {
              maxStartStakeGold,
            })
            .andWhere('user_infos.startStake != :startStake', {
              startStake: 0,
            });
          break;

        default:
          break;
      }
    }
    // sort
    if (sort) {
      const sortConvert = sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      builder.orderBy('user_infos.createdAt', sortConvert);
    } else {
      builder.orderBy('user_infos.createdAt', 'DESC');
    }
    const total = await builder.getCount();
    // paging
    if (!all) {
      builder.offset((page - 1) * limit).limit(limit);
    }

    return {
      data: await builder.getMany(),
      total: total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async getUserInfo(userAddress: string[]): Promise<UserInfoEntity[]> {
    return this.find({
      where: {
        userAddress: In(userAddress),
      },
    });
  }

  async getAllUserInfo(): Promise<UserInfoEntity[]> {
    return this.find();
  }

  async getUser(userAddress: string): Promise<UserInfoEntity> {
    return this.findOne({
      where: {
        userAddress: userAddress,
      },
    });
  }

  createUserInfoWithParam(address: string, startStake: string): UserInfoEntity {
    return createUserInfoWithParam(address, startStake);
  }
}
