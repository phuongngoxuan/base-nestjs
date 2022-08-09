import { Logger } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { defaultConfig } from 'src/configs/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { CrawlerModule } from './modules/crawler/crawler.module';
import { AdminModule } from './modules/admin/admin.module';
import { EventModule } from './modules/event/event.module';
import { PoolModule } from './modules/pool/pool.module';
import { UserModule } from './modules/user/user.module';
import { UserHistoryModule } from './modules/user-history/user-history.module';
import { ReadScModule } from './modules/read-sc/read-sc.module';
import { DatabaseCommonRepository } from './models/repositories/repository';

const Modules = [
  Logger,
  ScheduleModule.forRoot(),
  TypeOrmModule.forRoot(defaultConfig),
  DatabaseCommonRepository,
  ConsoleModule,
  AuthModule,
  CrawlerModule,
  AdminModule,
  EventModule,
  PoolModule,
  UserModule,
  UserHistoryModule,
  ReadScModule,
];

export default Modules;
