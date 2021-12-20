import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SendEmailService } from '../send-email/send-email.service'; 

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost): Promise<any> {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest(); 
      const user = request.headers.user
      const sendmailService = new SendEmailService()
      
      const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
     
          sendmailService.sendEmail(
              "stpham@acheter-louer.fr",
              "[Nestjs- TUTORIAL] " + exception.toString() ,
              "exception : " + exception.toString() + "\nstatus: " + status.toString() + "\nurl : " + request.url + "\nuser: " + user
          ).then(info=>{
              console.log("info",info)
          }).catch(err=>{
              console.log("sendmailService(err)",err)
          })
          response.status(status).json({
              statusCode: status,
              timestamp: new Date().toISOString(),
              path: request.url,
          });
      
  }
}