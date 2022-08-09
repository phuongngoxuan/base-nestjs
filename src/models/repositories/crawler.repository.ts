import { EntityRepository, Repository } from 'typeorm';
import { CrawlStatus } from '../entities/crawler-status.entity';
@EntityRepository(CrawlStatus)
export class CrawlStatusRepository extends Repository<CrawlStatus> {
  public async findContractName(contractName: string): Promise<any> {
    return await this.createQueryBuilder('crawl_status')
      .select('*')
      .where('crawl_status.contract_name = :contractName', { contractName })
      .execute();
  }

  async findContract(contractName: string): Promise<CrawlStatus> {
    return this.findOne({
      where: {
        contractName: contractName,
      },
    });
  }
}
