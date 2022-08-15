import { Module, Logger } from '@nestjs/common';
import { EventGateway } from './modules/socket/event.gateway';
import { NotificationGateway } from './modules/socket/notification.gateway';
import { RoomGateway } from './modules/socket/room.gateway';
import Modules from 'src/modules';
@Module({
  imports: [...Modules],
  controllers: [],
  providers: [Logger, EventGateway, NotificationGateway, RoomGateway],
})
export class AppModule {}
