import { Logger } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
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
];

export default Modules;
