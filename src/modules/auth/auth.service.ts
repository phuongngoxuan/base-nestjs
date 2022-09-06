import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthUtilsService } from './utils/auth.util';
import { LoginDto } from './dto/login.dto';
import { AdminService } from '../admin/admin.service';
import { Tokens } from './types/token.type';
import { createHash } from 'crypto';
import { resTokenType } from './types/response-token.type';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from '../../models/repositories/admin-info.repository';

@Injectable()
export class AuthService {
  constructor(
    private authUtilsService: AuthUtilsService,
    private adminService: AdminService,
    @InjectRepository(AdminRepository, 'master')
    private adminRepositoryMaster: AdminRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<resTokenType> {
    // check WalletAddress, Signature, Message
    const admin = await this.authUtilsService.validateAccount(loginDto);

    // sign AT and RT
    const tokens = await this.authUtilsService.getToken(loginDto);

    // hash RT
    admin.refreshToken = createHash('sha256')
      .update(tokens.refreshToken)
      .digest('hex');

    // update RT in table admin
    await this.adminRepositoryMaster.update(
      { walletAddress: admin.walletAddress },
      admin,
    );

    return {
      ...tokens,
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.EXP_ACCESS_TOKEN, 10),
    };
  }

  async logout(walletAddress: string): Promise<void> {
    await this.adminService.deleteRefreshToken(walletAddress);
  }

  async refreshToken(
    walletAddress: string,
    signature: string,
    message: string,
    refreshToken: string,
  ): Promise<resTokenType> {
    // check admin exit
    const admin = await this.adminService.findOne(walletAddress);
    if (!admin) {
      throw new ForbiddenException('Access Denied');
    }

    // hash RT input and compare RT in database
    const rtMatches = createHash('sha256').update(refreshToken).digest('hex');
    if (rtMatches != admin.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    // create new AT and RT
    const tokens = await this.authUtilsService.getToken({
      walletAddress,
      signature,
      message,
    });

    // hash new RT and update RT in database
    const newHashRt = createHash('sha256')
      .update(tokens.refreshToken)
      .digest('hex');

    // update refreshToken
    await this.adminRepositoryMaster.update(
      { walletAddress: admin.walletAddress },
      { ...admin, refreshToken: newHashRt },
    );

    return {
      ...tokens,
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.EXP_ACCESS_TOKEN, 10),
    };
  }
}
