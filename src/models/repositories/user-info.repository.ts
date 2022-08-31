import { EntityRepository, In, Repository } from 'typeorm';
import { QueryUserInfoDto } from '../../modules/user/dto/query-user.dto';
import { ResGetUserType } from '../../modules/user/type/res-get-user.type';
import { UserInfoEntity } from 'src/models/entities/user-info.entity';

@EntityRepository(UserInfoEntity)
export class UserInfoRepository extends Repository<UserInfoEntity> {
  async findUserAddress(userAddress: string): Promise<UserInfoEntity> {
    return await this.findOne({ where: { userAddress } });
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
    // time now (second)
    const now = Math.floor(new Date().getTime() / 1000);

    // sort
    if (sort) {
      const sortConvert = sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      builder.orderBy('user_infos.createdAt', sortConvert);
    } else {
      builder.orderBy('user_infos.createdAt', 'DESC');
    }
    // total
    const total = await builder.getCount();

    // paging
    if (!all) {
      builder.offset((page - 1) * limit).limit(limit);
    }

    /* note:
     * search date or block
     * if search from_date or to_date search one day
     *   if(to_date) -> (to_date - 86399) ->  query [time, time+ 86399 ]
     * if (from_date && to_date) -> query [from_date,to_date]
     * search block similar
     */
    // if ((from_date && !to_date) || (!from_date && to_date)) {
    //   let timeSearch = Number(from_date) || Number(to_date);
    //   //example input query , from_date = 1654707600, to_date = 1654793999
    //   if (to_date) timeSearch = timeSearch - 86399;
    //   arrCondition.push({ blockTimestamp: { $gte: timeSearch } });
    //   arrCondition.push({ blockTimestamp: { $lte: timeSearch + 86399 } }); // search one day
    // }
    // if (from_date && to_date) {
    //   arrCondition.push({ blockTimestamp: { $gte: Number(from_date) } });
    //   arrCondition.push({ blockTimestamp: { $lte: Number(to_date) } });
    // }

    // //search block
    // if ((from_block && !to_block) || (!from_block && to_block)) {
    //   arrCondition.push({ blockNumber: Number(from_block) || Number(to_block) });
    // }
    // if (from_block && to_block) {
    //   if (from_block) arrCondition.push({ blockNumber: { $gte: Number(from_block) } });
    //   if (to_block) arrCondition.push({ blockNumber: { $lte: Number(to_block) } });
    // }

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

  async getUser(userAddress: string): Promise<UserInfoEntity> {
    return this.findOne({
      where: {
        userAddress: userAddress,
      },
    });
  }
}
