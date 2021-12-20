import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
import { AdminGuard } from '../login/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './config-photo-profile';
import { BadRequestException, Req } from '@nestjs/common';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser(): Promise<any> {
    return await this.userService.getUser();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<any> {
    return await this.userService.getUserById(id);
  }

  @UseGuards(AdminGuard, AuthGuard('jwt'))
  @Get('/delete/:id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return await this.userService.deleteUser(parseInt(id));
  }

  @Post('/insert')
  async insertUser(@Body() user: User): Promise<any> {
    return await this.userService.insertUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/insertPhoto')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body('username') username: string,
  ) {
    console.log(file);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('invalid file');
    }

    console.log(
      'Avatar has been uploaded : ',
      file.filename,
      ' - for user :',
      username,
    );
    return await this.userService.insertUserPhoto(file.filename, username);
  }

  @UseGuards(AdminGuard, AuthGuard('jwt'))
  @Post('/update')
  async updateUser(@Body() params: User): Promise<any> {
    return await this.userService.updateUser(params);
  }

  @Get('/getPhoto/:fileName')
  async seeUploadedFile(@Param('fileName') file, @Res() res): Promise<any> {
    return await res.sendFile(file, { root: '../download/photo-profile/' });
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/info/:username')
  async getInfo(@Param('username') username: string): Promise<any> {
    return await this.userService.getInfo(username);
  }
}
