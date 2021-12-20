import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import {TypeOrmModule} from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { AllExceptionsFilter } from './filter/all-exeception-filter';
import { APP_FILTER } from '@nestjs/core';
import { UploadModule } from './upload/upload.module';
import { UploadExpModule } from './upload-exp/upload-exp.module';

@Module({
  imports: [
  UserModule, 
  ContactModule,
  TypeOrmModule.forRoot({

    // BDD à distance
    //------------------------------------------------------
    //name:"tutorial",
   // database: "tung",
   // type: "mysql",
   // synchronize:  false,
    //logging : true,
    //host: '10.0.1.233',
  //  port: 3306,
  //  username: 'tung',
 //   password: '8mQt4rGyzuzg',
  //  charset: "utf8mb4_unicode_ci",
   // entities: [__dirname + '/**/*.entity{.ts,.js}'],

    // BDD locale
    //------------------------------------------------------
   name:"tutorial",
   database: "tutorial",
   type: "mysql",
   synchronize:  false,
   logging : true,
   host: 'localhost',
   port: 3306,
   username: 'root',
   password: '',
   charset: "utf8mb4_unicode_ci",
   entities: [__dirname + '/**/*.entity{.ts,.js}'],


  }),

  LoginModule,

  UploadModule,

  UploadExpModule,
  


  

],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },],
  
})
export class AppModule {}
