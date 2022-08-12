import { Module, Logger } from '@nestjs/common';
import { EventGateway } from './modules/socket/event.gateway';
import { AlertGateway } from './modules/socket/alert.gateway';
import Modules from 'src/modules';
@Module({
  imports: [...Modules],
  controllers: [],
  providers: [Logger, EventGateway, AlertGateway],
})
export class AppModule {}
