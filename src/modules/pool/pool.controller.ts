import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PoolService } from './pool.service';
import { QueryPoolsDto } from './dto/query-pool.dto';
import { ResPoolType } from './type/respose-get-Pools.type';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
// import { AtGuards } from '../../common/guards/at.guards';
import { ResTotalRewardType } from './type/response-total-reward.type';

@Controller('pools')
@ApiTags('pools')
export class PoolController {
  constructor(private poolService: PoolService) {}

  @ApiOkResponse({
    type: ResPoolType,
    isArray: true,
  })
  @Get()
  async getPools(@Query() query: QueryPoolsDto): Promise<ResPoolType> {
    return await this.poolService.getPools(query);
  }

  @ApiOkResponse({
    type: ResTotalRewardType,
    isArray: true,
  })
  @Get('total-reward')
  async getTotalReward(): Promise<ResTotalRewardType> {
    return await this.poolService.getTotalReward();
  }
}
