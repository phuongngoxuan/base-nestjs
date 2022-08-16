import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/websocket',
  serveClient: false,
})
@Injectable()
export class EventGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('EventGateway');
  afterInit(server: Server) {
    //
  }

  @SubscribeMessage('eventToServer')
  handlerEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.wss.emit('eventToClient', data);
  }

  @SubscribeMessage('alertToServer')
  handlerAlert(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.wss.emit('alertToClient', data);
  }
}
