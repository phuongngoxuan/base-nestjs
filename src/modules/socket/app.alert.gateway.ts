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
  namespace: 'alert',
})
export class AlertGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');
  afterInit(server: Server) {
    this.logger.log('init');
  }

  @SubscribeMessage('alertToServer')
  handlerAlert(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.wss.emit('alertToClient', data);
  }
}
