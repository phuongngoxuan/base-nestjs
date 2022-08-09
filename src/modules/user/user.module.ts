import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserUtils } from './utils/user.utils';

@Module({
  controllers: [UserController],
  providers: [UserService, UserUtils],
  exports: [UserService, UserUtils],
})
export class UserModule {}
