import { ArgumentsHost, Catch, HttpException, HttpStatus, Inject, Logger } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {


  constructor() {
    super();
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).send({
      statusCode: status,
      message: this.setMessage(exception),
      path: request.url,
    });
  }

  private setMessage(exception : any) {
    let message : string | Array<string> = exception?.response?.message ? exception.response.message : exception.message;
    if(Array.isArray(message)) {
      message = message.join(`, `)
    }
    return message;
  }
}
