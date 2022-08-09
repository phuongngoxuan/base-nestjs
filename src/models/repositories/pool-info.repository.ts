import { EntityRepository, Repository } from 'typeorm';
import { PoolInfoEntity } from 'src/models/entities/pool-info.entity';
import { QueryPoolsDto } from '../../modules/pool/dto/query-pool.dto';
import { ResPoolType } from '../../modules/pool/type/respose-get-Pools.type';
import { statusConstant } from '../../modules/pool/constant/query-pool.constant';
@EntityRepository(PoolInfoEntity)
export class PoolInfoRepository extends Repository<PoolInfoEntity> {
  async getPoolList(poolsIds: number[]): Promise<PoolInfoEntity[]> {
    return await this.createQueryBuilder('pool_infos')
      .where('pool_infos.id IN (:poolsIds)', { poolsIds })
      .orderBy('pool_infos.id')
      .getMany();
  }

  async getPoolListByChain(
    poolsIds: number[],
    chainId: string,
  ): Promise<PoolInfoEntity[]> {
    return await this.createQueryBuilder('pool_infos')
      .where('pool_infos.id IN (:poolsIds)', { poolsIds })
      .andWhere('chain_id = :chainId', { chainId })
      .orderBy('pool_infos.id')
      .getMany();
  }

  async getPoolInactiveAndActive(now: number): Promise<PoolInfoEntity[]> {
    return await this.createQueryBuilder('pool_infos')
      .where(
        '(pool_infos.openTime > :now AND pool_infos.closeTime > :now) OR (pool_infos.openTime <= :now AND pool_infos.closeTime >= :now)',
        {
          now,
        },
      )
      .getMany();
  }

  async getTotalReward(now: number): Promise<{ total: number }> {
    // active and end
    return await this.createQueryBuilder('pool_infos')
      .select('SUM(pool_infos.total_reward * pool_infos.price)', 'total')
      .where(
        '(pool_infos.openTime <= :now AND pool_infos.closeTime >= :now) OR ( pool_infos.openTime < :now AND pool_infos.closeTime < :now )',
        {
          now,
        },
      )
      .getRawOne();
  }

  async getPoolInfo(poolId: number): Promise<PoolInfoEntity> {
    return this.findOne({ id: poolId });
  }

  async getAllPoolInfo(): Promise<PoolInfoEntity[]> {
    const poolInfo = await this.find();
    return poolInfo;
  }

  async getPools({
    poolId,
    sort,
    page,
    limit,
    symbol,
    status,
    closeTime,
    openTime,
    poolType,
    account,
  }: QueryPoolsDto): Promise<ResPoolType> {
    const now = Math.floor(new Date().getTime() / 1000);
    const builder = this.createQueryBuilder('pool_infos');

    // search
    if (poolId) {
      builder.where('pool_infos.id = :id', {
        id: Number(poolId),
      });
    }
    if (symbol)
      builder.andWhere('pool_infos.symbol like :symbol', {
        symbol: `%${symbol}%`,
      });
    if (poolType || poolType === 0)
      builder.andWhere('pool_infos.poolType = :poolType', {
        poolType,
      });
    if (closeTime)
      builder.andWhere('pool_infos.closeTime <= :closeTime', {
        closeTime,
      });
    if (openTime)
      builder.andWhere('pool_infos.openTime >= :openTime', {
        openTime,
      });

    if (status) {
      switch (status) {
        case statusConstant.STATUS_END_ACTIVE.toString():
          builder.andWhere(
            '((pool_infos.openTime <= :now AND pool_infos.closeTime >= :now) OR ( pool_infos.openTime < :now AND pool_infos.closeTime < :now ))',
            {
              now,
            },
          );
          break;
        case statusConstant.STATUS_INACTIVE.toString():
          builder.andWhere(
            'pool_infos.openTime > :now AND pool_infos.closeTime > :now',
            {
              now,
            },
          );
          break;
        case statusConstant.STATUS_ACTIVE.toString():
          builder.andWhere(
            'pool_infos.openTime <= :now AND pool_infos.closeTime >= :now',
            {
              now,
            },
          );
          break;
        case statusConstant.STATUS_LIVE:
          //active and inactive
          builder.andWhere(
            '((pool_infos.openTime <= :now AND pool_infos.closeTime >= :now) OR (pool_infos.openTime > :now AND pool_infos.closeTime > :now))',
            {
              now,
            },
          );
          break;
        case statusConstant.STATUS_ENDED.toString():
          builder.andWhere(
            ' (pool_infos.openTime < :now AND pool_infos.closeTime < :now)',
            {
              now,
            },
          );
          break;
        case statusConstant.STATUS_FINISHED:
          builder.andWhere(
            ' (pool_infos.openTime < :now AND pool_infos.closeTime < :now)',
            {
              now,
            },
          );
          break;
        default:
          break;
      }
    }

    // sort
    if (sort) {
      const sortConvert = sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      builder.orderBy('pool_infos.createdAt', sortConvert);
    } else {
      builder.orderBy('pool_infos.createdAt', 'DESC');
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
