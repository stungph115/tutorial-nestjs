import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadExpService } from './upload-exp.service';
import { extname } from 'path/posix';
import { diskStorage } from 'multer';

@Controller('upload-exp')
export class UploadExpController {
  constructor(private uploadExpService: UploadExpService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../download/archive-exp',
        filename: (req, file, callback) => {
          const bodyName = req.body.file_name;
          const date = new Date();

          var day = date.getDate().toString();
          if (day.length == 1) {
            day = '0' + day;
          }
          var monthraw = date.getMonth() + 1;
          var month = monthraw.toString();
          if (month.length == 1) {
            month = '0' + month;
          }
          var year = date.getFullYear().toString();
          var hour = date.getHours().toString();
          if (day.length == 1) {
            hour = '0' + hour;
          }
          var min = date.getMinutes().toString();
          if (min.length == 1) {
            min = '0' + min;
          }
          var sec = date.getSeconds().toString();
          if (sec.length == 1) {
            sec = '0' + sec;
          }

          const fileExtName = extname(file.originalname);
          console.log(
            'time now is',
            day,
            '/',
            month,
            '/',
            year,
            '-',
            hour,
            '/',
            min,
            '/',
            sec,
          );
          const newname = callback(
            null,
            `${bodyName}_${day}-${month}-${year}_${hour}h-${min}m-${sec}s${fileExtName}`,
          );
        },
      }),
    }),
  )
  async upload(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body('file_name') new_name: string,
    @Body('ca') ca: string,
    @Body('title') title: string,
    @Body('username') username: string,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('invalid file');
    }
    //console.log ('file has been uploaded, filename is : ', file.filename, "with data :", new_name, ca, title, username);
    //console.log(" cc",file);
    return await this.uploadExpService.insertFile(
      file.filename,
      ca,
      title,
      username,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getFiles(): Promise<any> {
    return await this.uploadExpService.GetFileListing();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/delete/:file')
  async deleteFile(@Param('file') file: string): Promise<any> {
    return await this.uploadExpService.deleteFile(file);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':fileName')
  async seeUploadedFile(@Param('fileName') file, @Res() res): Promise<any> {
    return await res.sendFile(file, { root: '../download/archive-exp/' });
  }
}
