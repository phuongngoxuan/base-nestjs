import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SocketService } from './socket.service';

@Controller('socket')
@ApiTags('socket')
export class SocketController {
  constructor(private socketService: SocketService) {}
  @Get()
  async getListEvent(): Promise<void> {
    console.log('hello i am in ');
  }
}
