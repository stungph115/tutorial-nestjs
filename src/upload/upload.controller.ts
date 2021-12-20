import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { multerConfig } from './config-file-upload';
import { BadRequestException, Req } from '@nestjs/common';

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) {}

  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', multerConfig ))
    async uploadFile(@Req() req, @UploadedFile() file: Express.Multer.File) {
        console.log(file);
        if (req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new BadRequestException('invalid file');
        }
        console.log ('file has been uploaded, filename is : ', file.filename);
    }
    
    @Get(':fileName')
    async seeUploadedFile(@Param('fileName') file, @Res() res): Promise<any> {
        return await res.sendFile(file, {root: '../download/file-uploaded/'});
    } 
    @Get()
    async getFiles():Promise<any>{
        return await this.uploadService.GetFileListing();
    }     
}
