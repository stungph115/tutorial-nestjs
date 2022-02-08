import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './graph-log.entity';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  providers: [LogService],controllers: [LogController],
  imports:[
    TypeOrmModule.forFeature([Log], "serverDev")
  ]
})
export class LogModule {}
