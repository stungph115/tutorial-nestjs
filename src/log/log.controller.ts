import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
    constructor(private logService: LogService){}

    @Post('list/')
    async getList(@Body() params :any): Promise<any>{
        console.log("date", params.dateDeb, params.dateFin, "id", params.id_user)
        return await this.logService.getList(params)
    }

    @Get('getUser')
    async getUser(): Promise<any>{
        return await this.logService.getUser();
    }
}
    