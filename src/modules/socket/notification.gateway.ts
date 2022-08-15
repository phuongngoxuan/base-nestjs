import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/websocket',
  serveClient: false,
  namespace: 'notification',
})
export class NotificationGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('NotificationGateway');
  afterInit(server: Server) {
    this.logger.log('init');
  }

  @SubscribeMessage('notificationToServer')
  handlerNotification(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.wss.emit('notificationToClient', data);
  }
}
