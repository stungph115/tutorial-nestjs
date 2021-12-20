import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get()
  async getContact(): Promise<any> {
    return await this.contactService.getContact();
  }

  @Get(':id')
  async getContactById(@Param('id') id: number): Promise<any> {
    return await this.contactService.getContactById(id);
  }

  @Get('/delete/:id')
  async deleteContact(@Param('id') id: string): Promise<any> {
    return await this.contactService.deleteContact(parseInt(id));
  }

  @Post('/insert')
  async insertContact(@Body() contact: Contact): Promise<any> {
    return await this.contactService.insertContact(contact);
  }

  @Post('/update')
  async updateContact(@Body() params: Contact): Promise<any> {
    return await this.contactService.updateContact(params);
  }
}
