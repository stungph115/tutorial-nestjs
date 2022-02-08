import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { FileLib } from 'src/shared/lib/file';
import { File } from './file.entity';
import { UploadExpController } from './upload-exp.controller';
import { UploadExpService } from './upload-exp.service';

@Module({
  controllers: [UploadExpController],
  providers: [UploadExpService, FileLib],
  imports:[
    ServeStaticModule.forRoot
    ({rootPath: join(__dirname, '..', 'download/archive-exp')}),
    //MulterModule.register({dest: '../download'})
    TypeOrmModule.forFeature([File], "local")
    ],
})
export class UploadExpModule {}
