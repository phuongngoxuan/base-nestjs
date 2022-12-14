import * as dotenv from 'dotenv';
dotenv.config();

import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from 'src/app.module';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
  contextOptions: {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  },
});
bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
    process.exit(0);
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
