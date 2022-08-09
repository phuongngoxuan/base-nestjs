import { Controller, Query, Get } from '@nestjs/common';
import { QueryUserHistoryDto } from './dto/query-history-user.dto';
import { ResGetUserHistory } from './type/respose-get-history-user.type';
import { UserHistoryService } from './user-history.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@Controller('user-history')
@ApiTags('user-history')
export class UserHistoryController {
  constructor(private userHistoryService: UserHistoryService) {}

  @ApiOkResponse({
    type: ResGetUserHistory,
    isArray: true,
  })
  @Get()
  async getHistoryUser(
    @Query() query: QueryUserHistoryDto,
  ): Promise<ResGetUserHistory> {
    return await this.userHistoryService.getUserHistory(query);
  }
}
