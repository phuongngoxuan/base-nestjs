import { UserHistoryService } from './user-history.service';
import { UserHistoryController } from './user-history.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserHistoryController],
  providers: [UserHistoryService],
  exports: [UserHistoryService],
})
export class UserHistoryModule {}
