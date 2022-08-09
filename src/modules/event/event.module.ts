import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Module, forwardRef } from '@nestjs/common';
import { UserHistoryModule } from '../user-history/user-history.module';
import { UserModule } from '../user/user.module';
import { ReadScModule } from '../read-sc/read-sc.module';
import { EventUtils } from './utils/event.utils';
import { CrawlerModule } from '../crawler/crawler.module';

@Module({
  imports: [
    forwardRef(() => CrawlerModule),
    UserHistoryModule,
    UserModule,
    ReadScModule,
  ],
  controllers: [EventController],
  providers: [EventService, EventUtils],
  exports: [EventService, EventUtils],
})
export class EventModule {}
