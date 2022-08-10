import { Module, HttpModule } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CrawlUtils } from './utils/crawler-utils';
import { EventModule } from '../event/event.module';
import { HandlerEvent } from './handler/event.handler';
import { CrawlerAllEventService } from './crawler-all-event.service';
import { ReadScModule } from '../read-sc/read-sc.module';

@Module({
  providers: [CrawlUtils, HandlerEvent, CrawlerService, CrawlerAllEventService],
  imports: [EventModule, ReadScModule, HttpModule],
  exports: [CrawlerService, CrawlUtils],
})
export class CrawlerModule {}
