import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthUtilsService } from './utils/auth.util';
import { LoginDto } from './dto/login.dto';
import { AdminService } from '../admin/admin.service';
import { Tokens } from './types/token.type';
import { createHash } from 'crypto';
import { resTokenType } from './types/response-token.type';

@Injectable()
export class AuthService {
  constructor(
    private authUtilsService: AuthUtilsService,
    private adminService: AdminService,
  ) {}

  async login(loginDto: LoginDto): Promise<resTokenType> {
    const admin = await this.authUtilsService.validateAccount(loginDto);
    const tokens = await this.authUtilsService.getToken(loginDto);
    admin.refreshToken = createHash('sha256')
      .update(tokens.refreshToken)
      .digest('hex');
    await this.adminService.updateRefreshToken(admin);

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
    const admin = await this.adminService.findOne(walletAddress);
    if (!admin) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = createHash('sha256').update(refreshToken).digest('hex');
    if (rtMatches != admin.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.authUtilsService.getToken({
      walletAddress,
      signature,
      message,
    });

    const newHashRt = createHash('sha256')
      .update(tokens.refreshToken)
      .digest('hex');

    await this.adminService.updateRefreshToken({
      ...admin,
      refreshToken: newHashRt,
    });

    return {
      ...tokens,
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.EXP_ACCESS_TOKEN, 10),
    };
  }
}
