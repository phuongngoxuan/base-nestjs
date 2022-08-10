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
})
export class AppGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');
  afterInit(server: Server) {
    this.logger.log('init');
  }

  handlerDisconnect(client: any) {
    this.logger.log('client disconnect - ', client.id);
  }

  handlerConnection(client: any, ...arg: []) {
    this.logger.log('client connection - ', client.id);
  }

  @SubscribeMessage('events')
  findAll(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): WsResponse<string> {
    this.wss.emit('events', 'tex');
    return { event: 'event', data: data };
  }
}
