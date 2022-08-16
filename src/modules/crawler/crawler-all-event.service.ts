import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { CrawlerService } from './crawler.service';
import { baseContractInfo } from './config/crawler.config';
import { Logger } from '@nestjs/common';

@Console()
@Injectable()
export class CrawlerAllEventService {
  constructor(private crawlerService: CrawlerService) {}
  private logger: Logger = new Logger('CrawlerEvent');
  @Command({
    command: 'crawl',
    description: 'crawl',
  })
  async startCrawler(): Promise<void> {
    try {
      await this.crawlerService.start(baseContractInfo);
    } catch (error) {
      this.logger.error(error);
      console.log(error);
      process.exit(1);
    }
    return new Promise(() => {
      null;
    });
  }
}
