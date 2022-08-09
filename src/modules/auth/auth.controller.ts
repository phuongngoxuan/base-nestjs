import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { AtGuards } from '../../common/guards/at.guards';
import { RtGuards } from '../../common/guards/rt.guards';
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorators';
import { AuthGuard } from '@nestjs/passport';
import { resTokenType } from './types/response-token.type';

@ApiBearerAuth('defaultBearerAuth')
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: resTokenType })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<resTokenType> {
    const tokens = await this.authService.login(loginDto);
    return tokens;
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AtGuards)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request): Promise<{ message: string }> {
    await this.authService.logout(req.user['walletAddress']);
    return { message: 'User was successfully Logout!' };
  }

  @Post('refresh-token')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(RtGuards)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: resTokenType })
  async refresh(
    @GetCurrentUser('walletAddress') walletAddress: string,
    @GetCurrentUser('signature') signature: string,
    @GetCurrentUser('message') message: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<resTokenType> {
    const tokens = await this.authService.refreshToken(
      walletAddress,
      signature,
      message,
      refreshToken,
    );
    return tokens;
  }
}
