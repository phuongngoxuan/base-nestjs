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
}
