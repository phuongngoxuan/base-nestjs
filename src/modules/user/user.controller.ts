import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { QueryUserInfoDto } from './dto/query-user.dto';
import { ResGetUserType } from './type/res-get-user.type';
import { ResGetTierUserType } from './type/res-tier-user.type';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({
    type: ResGetUserType,
    isArray: true,
  })
  @Get()
  async getUsers(
    @Query() queryUserDto: QueryUserInfoDto,
  ): Promise<ResGetUserType> {
    return this.userService.getUsers(queryUserDto);
  }

  @ApiOkResponse({
    type: ResGetTierUserType,
    isArray: true,
  })
  @Get('tier')
  async getTier(): Promise<ResGetTierUserType> {
    return this.userService.getTier();
  }

  @Get('stake-amount')
  async getAmountStake(@Query() params): Promise<string> {
    //todo
    return '1000';
  }
}
