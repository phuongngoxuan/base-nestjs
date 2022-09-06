import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../../models/repositories/admin-info.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../../models/entities/admin-info.entity';
import { QueryAdminDto } from './dto/query-admin.dto';
import { ResGetAdminType } from './type/response-get-admin.type';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository, 'master')
    private adminRepositoryMaster: AdminRepository,
  ) {}

  async getAdminList(queryDto: QueryAdminDto): Promise<ResGetAdminType> {
    return await this.adminRepositoryMaster.getAdminList(queryDto);
  }

  async findOne(walletAddress: string): Promise<AdminEntity> {
    return await this.adminRepositoryMaster.findOne({
      where: { walletAddress },
    });
  }

  async updateRefreshToken(data: AdminEntity): Promise<void> {
    await this.adminRepositoryMaster.update(
      { walletAddress: data.walletAddress },
      data,
    );
  }

  async deleteRefreshToken(walletAddress: string): Promise<void> {
    await this.adminRepositoryMaster.update(
      { walletAddress },
      { refreshToken: null },
    );
  }
}
