import { Controller, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';
import { QueryAdminDto } from './dto/query-admin.dto';
import { ResGetAdminType } from './type/response-get-admin.type';

@Controller('admins')
@ApiTags('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get()
  async getStakingInPool(
    @Query() queryDto: QueryAdminDto,
  ): Promise<ResGetAdminType> {
    return await this.adminService.getAdminList(queryDto);
  }
}
