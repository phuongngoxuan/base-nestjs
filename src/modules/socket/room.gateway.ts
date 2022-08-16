import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/websocket',
  serveClient: false,
  namespace: 'room',
})
@Injectable()
export class RoomGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('RoomGateway');
  afterInit(server: Server) {
    //
  }

  @SubscribeMessage('chatRoomToServer')
  handlerChatRoom(
    @MessageBody() data: { sender: string; room: string; message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    this.wss.to(data.room).emit('chatRoomToClient', data.message);
  }

  @SubscribeMessage('joinRoom')
  handlerJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handlerLeaveRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(room);
    client.emit('leftRoom', room);
  }
}
