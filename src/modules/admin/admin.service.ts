import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../../models/repositories/admin-info.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../../models/entities/admin-info.entity';
import { QueryAdminDto } from './dto/query-admin.dto';
import { ResGetAdminType } from './type/response-get-admin.type';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository) private adminRepository: AdminRepository,
  ) {}

  async getAdminList(queryDto: QueryAdminDto): Promise<ResGetAdminType> {
    return await this.adminRepository.getAdminList(queryDto);
  }

  async findOne(walletAddress: string): Promise<AdminEntity> {
    return await this.adminRepository.findOne({ walletAddress: walletAddress });
  }

  async updateRefreshToken(data: AdminEntity): Promise<void> {
    await this.adminRepository.update(
      { walletAddress: data.walletAddress },
      data,
    );
  }

  async deleteRefreshToken(walletAddress: string): Promise<void> {
    await this.adminRepository.update(
      { walletAddress },
      { refreshToken: null },
    );
  }
}
