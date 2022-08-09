import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from '../../../shares/constants/errorMessage.constant';
import { LoginDto } from '../dto/login.dto';
import { Tokens } from '../types/token.type';
import { AdminEntity } from '../../../models/entities/admin-info.entity';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../../admin/admin.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');

@Injectable()
export class AuthUtilsService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  async validateAccount(loginDto: LoginDto): Promise<AdminEntity> {
    const checkMessage = await this.checkRecoverSameAddress(loginDto);
    console.log(checkMessage);
    if (!checkMessage) {
      throw new HttpException(
        httpErrors.ACCOUNT_HASH_NOT_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    }
    const admin = await this.adminService.findOne(loginDto.walletAddress);
    if (!admin) {
      throw new HttpException(httpErrors.FORBIDDEN, HttpStatus.FORBIDDEN);
    } else {
      return admin;
    }
  }

  async checkRecoverSameAddress({
    walletAddress,
    message,
    signature,
  }: LoginDto): Promise<boolean> {
    try {
      const web3Provider = new Web3.providers.HttpProvider(process.env.RPC);
      const web3 = new Web3(web3Provider);
      const recover = await web3.eth.accounts.recover(message, signature);
      const recoverConvert = web3.utils.toChecksumAddress(recover);
      const addressConvert = web3.utils.toChecksumAddress(walletAddress);
      return addressConvert === recoverConvert;
    } catch (e) {
      throw new HttpException(
        httpErrors.VERIFY_SIGNATURE_FAIL,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getToken(loginDto: LoginDto): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          ...loginDto,
          date: Date.now(),
        },
        {
          secret: process.env.SECRET_ACCESS_TOKEN,
          expiresIn: parseInt(process.env.EXP_ACCESS_TOKEN, 10),
        },
      ),
      this.jwtService.signAsync(
        {
          ...loginDto,
          date: Date.now(),
        },
        {
          secret: process.env.SECRET_REFRESH_TOKEN,
          expiresIn: parseInt(process.env.EXP_REFRESH_TOKEN, 10),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
