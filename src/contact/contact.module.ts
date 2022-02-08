import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Contact } from './contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports:[TypeOrmModule.forFeature([Contact], "local")],
})
export class ContactModule {}
