import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

/** use route
 * example: 
 * @Post()
 * @UseFilters(HttpExceptionFilter)
 * 
 * use controller 
 * example:
   @UseFilters(new HttpExceptionFilter())
   export class CatsController {}

 * use global 
 * example:
   async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.useGlobalFilters(new HttpExceptionFilter());
   await app.listen(3000);
   }
 **/
