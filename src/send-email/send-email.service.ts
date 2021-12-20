import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'; 
import { emailConfig } from './mail.config'; 
 @Injectable()
export class SendEmailService { 
  private _transporter: nodemailer.Transporter; 
  constructor() { 
    this._transporter = nodemailer.createTransport(emailConfig); 
  } 
 async sendEmail(to: string, subject: string, message: string): Promise<any> { 
    let options = { 
      from: "stpham@acheter-louer.fr", 
      to: to,
      subject: subject, 
      text:  message
    } 

    this._transporter.sendMail(  
      options, (error, info) => { 
        if (error) { 
          return console.log(`error: ${error}`); 
        } 
        console.log(`Message Sent ${info.response}`); 
      }); 
  } 
} 