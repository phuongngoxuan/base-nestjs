import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { NotificationGateway } from './notification.gateway';
import { RoomGateway } from './room.gateway';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';

@Module({
  imports: [],
  controllers: [SocketController],
  providers: [EventGateway, NotificationGateway, RoomGateway, SocketService],
  exports: [EventGateway, NotificationGateway, RoomGateway, SocketService],
})
export class SocketModule {}
