import { Repository, EntityRepository } from 'typeorm';
import { AdminEntity } from '../entities/admin-info.entity';
import { QueryAdminDto } from '../../modules/admin/dto/query-admin.dto';
import { ResGetAdminType } from '../../modules/admin/type/response-get-admin.type';

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {
  async getAdminList({
    page,
    limit,
    account,
    sort,
  }: QueryAdminDto): Promise<ResGetAdminType> {
    const builder = this.createQueryBuilder('admins');
    // search
    if (account) {
      builder.where('admins.walletAddress like :walletAddress ', {
        walletAddress: `%${account}%`,
      });
    }
    // sort
    if (sort) {
      const sortConvert = sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      console.log(sortConvert);
      builder.orderBy('admins.createdAt', sortConvert);
    } else {
      builder.orderBy('admins.createdAt', 'DESC');
    }
    const total = await builder.getCount();
    // paging
    builder.offset((page - 1) * limit).limit(limit);

    return {
      data: await builder.getMany(),
      total: total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  async checkAdminExist(walletAddress: string) {
    const admin = await this.findOne({ walletAddress: walletAddress });
    if (admin) {
      return true;
    } else {
      return false;
    }
  }
}
