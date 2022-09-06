import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CrawlerService } from './crawler.service';
import { EventModule } from '../event/event.module';
import { HandlerEvent } from './handler/event.handler';
import { CrawlerAllEventService } from './crawler-event.service';
import { ReadScModule } from '../read-sc/read-sc.module';

@Module({
  providers: [HandlerEvent, CrawlerService, CrawlerAllEventService],
  imports: [EventModule, ReadScModule, HttpModule],
  exports: [CrawlerService],
})
export class CrawlerModule {}
