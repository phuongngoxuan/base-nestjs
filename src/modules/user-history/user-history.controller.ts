import { Controller, Query, Get } from '@nestjs/common';
import { QueryUserHistoryDto } from './dto/query-history-user.dto';
import { UserHistoryType } from './type/user-history.type';
import { UserHistoryService } from './user-history.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@Controller('user-history')
@ApiTags('user-history')
export class UserHistoryController {
  constructor(private userHistoryService: UserHistoryService) {}

  @ApiOkResponse({
    type: UserHistoryType,
    isArray: true,
  })
  @Get()
  async getUserHistory(
    @Query() query: QueryUserHistoryDto,
  ): Promise<UserHistoryType> {
    return await this.userHistoryService.getUserHistory(query);
  }
}
