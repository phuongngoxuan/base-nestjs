import { EntityRepository, Repository } from 'typeorm';
import { UserHistoryEntity } from 'src/models/entities/user-history.entity';
import { QueryUserHistoryDto } from '../../modules/user-history/dto/query-history-user.dto';
import { UserHistoryType } from '../../modules/user-history/type/user-history.type';

@EntityRepository(UserHistoryEntity)
export class UserHistoryRepository extends Repository<UserHistoryEntity> {
  async getHistoryUser({
    account,
    sort,
    page,
    limit,
  }: QueryUserHistoryDto): Promise<UserHistoryType> {
    const builder = this.createQueryBuilder('user_histories');
    // search
    if (account) {
      builder.where('user_histories.user_address like :user_address', {
        user_address: `%${account}%`,
      });
    }
    // sort
    if (sort) {
      const sortConvert = sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      builder.orderBy('user_histories.created_at', sortConvert);
    } else {
      builder.orderBy('user_histories.created_at', 'DESC');
    }
    const total = await builder.getCount();
    // paging
    builder.offset((page - 1) * limit).limit(limit);

    return {
      data: await builder.getMany(),
      total: total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
