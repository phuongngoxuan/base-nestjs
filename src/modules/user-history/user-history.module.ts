import { UserHistoryService } from './user-history.service';
import { UserHistoryController } from './user-history.controller';
import { Module } from '@nestjs/common';
import { PoolModule } from '../pool/pool.module';

@Module({
  imports: [PoolModule],
  controllers: [UserHistoryController],
  providers: [UserHistoryService],
  exports: [UserHistoryService],
})
export class UserHistoryModule {}
