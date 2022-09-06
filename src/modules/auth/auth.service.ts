import {
  ForbiddenException,
  Injectable,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { AuthUtilsService } from './utils/auth.util';
import { LoginDto } from './dto/login.dto';
import { AdminService } from '../admin/admin.service';
import { Tokens } from './types/token.type';
import { createHash } from 'crypto';
import { resTokenType } from './types/response-token.type';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from '../../models/repositories/admin-info.repository';
import { Cache } from 'cache-manager';
import { getConfig } from 'src/configs/index';
const ttlRT = getConfig().get<string>('ttl.rtCache');

@Injectable()
export class AuthService {
  constructor(
    private authUtilsService: AuthUtilsService,
    private adminService: AdminService,
    @InjectRepository(AdminRepository, 'master')
    private adminRepositoryMaster: AdminRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async login(loginDto: LoginDto): Promise<resTokenType> {
    // check WalletAddress, Signature, Message
    const admin = await this.authUtilsService.validateAccount(loginDto);

    // sign AT and RT
    const tokens = await this.authUtilsService.getToken(loginDto);

    // hash RT
    const RTHast = createHash('sha256')
      .update(tokens.refreshToken)
      .digest('hex');

    // update RT cache
    await this.cacheManager.set<string>(
      `RTCache_${admin.walletAddress}`,
      RTHast,
      {
        ttl: ttlRT,
      },
    );

    return {
      ...tokens,
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.EXP_ACCESS_TOKEN, 10),
    };
  }

  async logout(walletAddress: string): Promise<void> {
    await this.cacheManager.del(`RTCache_${walletAddress}`);
  }

  async refreshToken(
    walletAddress: string,
    signature: string,
    message: string,
    refreshToken: string,
  ): Promise<resTokenType> {
    const RTCache = await this.cacheManager.get(`RTCache_${walletAddress}`);

    // check RT cache
    if (!RTCache) {
      throw new ForbiddenException('Access Denied');
    }

    // hash RT input and compare RT in database
    const rtMatches = createHash('sha256').update(refreshToken).digest('hex');
    if (rtMatches != RTCache) {
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

    // update RT cache
    await this.cacheManager.set<string>(`RTCache_${walletAddress}`, newHashRt, {
      ttl: ttlRT,
    });

    return {
      ...tokens,
      iat: Date.now(),
      exp: Date.now() + parseInt(process.env.EXP_ACCESS_TOKEN, 10),
    };
  }
}
