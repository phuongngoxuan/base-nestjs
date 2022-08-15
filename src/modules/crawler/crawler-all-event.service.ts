import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { CrawlerService } from './crawler.service';
import { baseContractInfo } from './config/crawler.config';

@Console()
@Injectable()
export class CrawlerAllEventService {
  constructor(private crawlerService: CrawlerService) {}

  @Command({
    command: 'crawl',
    description: 'crawl',
  })
  async startCrawler(): Promise<void> {
    try {
      await this.crawlerService.start(baseContractInfo);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
    return new Promise(() => {
      null;
    });
  }
}
