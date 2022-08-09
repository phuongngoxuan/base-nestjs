import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PoolInfoRepository } from '../../models/repositories/pool-info.repository';
import { QueryPoolsDto } from './dto/query-pool.dto';
import { ResPoolType } from './type/respose-get-Pools.type';
import { PoolInfoEntity } from '../../models/entities/pool-info.entity';
import { CrawlStatusRepository } from '../../models/repositories/crawler.repository';
import { UserUtils } from '../user/utils/user.utils';

@Injectable()
export class PoolService {
  constructor(
    @InjectRepository(PoolInfoRepository, 'default')
    private poolInfoRepository: PoolInfoRepository,
    @InjectRepository(CrawlStatusRepository, 'default')
    private userUtils: UserUtils,
  ) {}

  async getPoolList(poolsIds: number[]): Promise<PoolInfoEntity[]> {
    return await this.poolInfoRepository.getPoolList(poolsIds);
  }

  async getPoolListByChain(
    poolsIds: number[],
    chainId: string,
  ): Promise<PoolInfoEntity[]> {
    return this.poolInfoRepository.getPoolListByChain(poolsIds, chainId);
  }

  async getPoolInactiveAndActive(): Promise<PoolInfoEntity[]> {
    const now = await this.userUtils.getTimeNow();
    return await this.poolInfoRepository.getPoolInactiveAndActive(now);
  }

  async getTotalReward(): Promise<{ total: number }> {
    const now = await this.userUtils.getTimeNow();
    return await this.poolInfoRepository.getTotalReward(now);
  }

  async getPools(@Query() queryDto: QueryPoolsDto): Promise<ResPoolType> {
    const {
      data,
      total,
      page,
      lastPage,
    } = await this.poolInfoRepository.getPools(queryDto);
    console.log(queryDto);

    if (queryDto.account) {
      const pools = await this.getPendingReward(data, queryDto.account);
      return { data: pools, total, page, lastPage };
    }
    return { data, total, page, lastPage };
  }

  async findPools(id: number): Promise<PoolInfoEntity> {
    return await this.poolInfoRepository.findOne(id);
  }
  async updateOne(pool: PoolInfoEntity): Promise<void> {
    await this.poolInfoRepository.update({ id: pool.id }, pool);
  }
  async getPendingReward(
    data: PoolInfoEntity[],
    account: string,
  ): Promise<any> {
    const pools = [];
    for (let i = 0; i < data.length; i++) {
      //todo : get pendingReward
      const userRewardInfo = '0';
      pools.push({
        ...data[i],
        pendingReward: userRewardInfo ?? '0',
      });
    }
    return pools;
  }
}
