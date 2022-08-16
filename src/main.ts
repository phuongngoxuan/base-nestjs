import * as dotenv from 'dotenv';
dotenv.config();
import * as config from 'config';
import helmet from 'helmet';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { SchedulerRegistry } from '@nestjs/schedule';
// import { ResponseTransformInterceptor } from 'src/shares/interceptors/response.interceptor';
import { BodyValidationPipe } from 'src/shares/pipes/body.validation.pipe';
import { AppModule } from 'src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const appPort = config.get<number>('app.port');
const prefix = config.get<string>('app.prefix');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['log', 'debug', 'error', 'verbose', 'warn'],
  });

  app.setGlobalPrefix(process.env.PREFIX);

  //Document
  const config = new DocumentBuilder()
    .setTitle('Base-v2 staking be')
    .setDescription('Base-v2 API description')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      filter: true,
      displayRequestDuration: true,
    },
  });

  app.enableCors();
  // app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(new BodyValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'src/static'));
  app.use(helmet());

  await app.listen(appPort);
  const logger = app.get(Logger);
  logger.log(
    `Application is running on: ${await app.getUrl()}`,
    'NestApplication',
  );
}
bootstrap();
