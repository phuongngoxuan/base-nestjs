import { CacheModule, Logger } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
// import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { defaultConfig } from 'src/configs/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { CrawlerModule } from './modules/crawler/crawler.module';
import { AdminModule } from './modules/admin/admin.module';
import { EventModule } from './modules/event/event.module';
import { UserHistoryModule } from './modules/user-history/user-history.module';
import { ReadScModule } from './modules/read-sc/read-sc.module';
import { DatabaseCommonRepository } from './models/repositories/repository';
import { SocketModule } from './modules/socket/socket.module';
import { UploadModule } from './modules/upload/upload.module';
import { redisConfig } from 'src/configs/redis.config';
import * as redisStore from 'cache-manager-redis-store';

const Modules = [
  ScheduleModule.forRoot(),
  TypeOrmModule.forRoot(defaultConfig),
  DatabaseCommonRepository,
  ConsoleModule,
  AuthModule,
  CrawlerModule,
  AdminModule,
  EventModule,
  UserHistoryModule,
  ReadScModule,
  SocketModule,
  UploadModule,
  SocketModule,
  // BullModule.forRoot({
  //   url: `${redisConfig.host}:${redisConfig.port}`,
  // }),
  // CacheModule.register({
  //   store: redisStore,
  //   ...redisConfig,
  //   isGlobal: true,
  // }),
];

export default Modules;
