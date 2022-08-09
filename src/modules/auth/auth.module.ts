import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUtilsService } from './utils/auth.util';
import { AdminModule } from '../admin/admin.module';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AdminModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AuthUtilsService, AtStrategy, RtStrategy],
})
export class AuthModule {}
