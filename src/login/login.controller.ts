import { LoginService } from './login.service';
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { User } from '../user/user.entity';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  async getUser(): Promise<any> {
    return await this.loginService.getUser();
  }

  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<any> {
    return await this.loginService.getUserByUsername(username);
  }
  @Post()
  async login(@Body() params :any): Promise<any> {
    //console.log('login')
    return await this.loginService.login(params);
  }
}

