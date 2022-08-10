import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHistoryRepository } from 'src/models/repositories/user-history.repository';
import { CrawlStatusRepository } from './crawler.repository';
import { AdminRepository } from './admin-info.repository';
import { UserInfoRepository } from './user-info.repository';

const commonRepositories = [
  UserInfoRepository,
  UserHistoryRepository,
  CrawlStatusRepository,
  AdminRepository,
];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(commonRepositories, 'default')],
  exports: [TypeOrmModule],
})
export class DatabaseCommonRepository {}
