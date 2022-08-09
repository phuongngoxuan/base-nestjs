import { ReadScService } from './read-sc.service';
import { ReadScController } from './read-sc.controller';
import { Module } from '@nestjs/common';
@Module({
  imports: [],
  controllers: [ReadScController],
  providers: [ReadScService],
  exports: [ReadScService],
})
export class ReadScModule {}
