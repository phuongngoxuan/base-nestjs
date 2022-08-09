import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolInfoRepository } from 'src/models/repositories/pool-info.repository';
import { UserHistoryRepository } from 'src/models/repositories/user-history.repository';
import { CrawlStatusRepository } from './crawler.repository';
import { AdminRepository } from './admin-info.repository';
import { UserInfoRepository } from './user-info.repository';

const commonRepositories = [
  UserInfoRepository,
  UserHistoryRepository,
  PoolInfoRepository,
  CrawlStatusRepository,
  AdminRepository,
];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(commonRepositories, 'default')],
  exports: [TypeOrmModule],
})
export class DatabaseCommonRepository {}
