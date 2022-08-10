import { Module, Logger } from '@nestjs/common';
import { AppGateway } from './modules/socket/app.gateway';
import Modules from 'src/modules';
@Module({
  imports: [...Modules],
  controllers: [],
  providers: [Logger, AppGateway],
})
export class AppModule {}
