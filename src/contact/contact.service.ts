import { HttpException, Injectable } from '@nestjs/common';
import { Contact } from './contact.entity';
import { Repository, getConnection } from 'typeorm';
import { InjectConnection, InjectRepository, getConnectionPrefix } from '@nestjs/typeorm';
import { from } from 'rxjs';
@Injectable()
export class ContactService {
  list: Contact[] = [];
  constructor(
        @InjectConnection('tutorial')
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>
  ) {}

  async getContact(): Promise<Contact[]> {
    console.log('getContact');
    return await getConnection('tutorial').getRepository(Contact).find({
      order: {
        id: 'ASC'
      }
    })
  }

  async getContactById(id: number): Promise<Contact> {
    console.log('getContactById');
    return await getConnection('tutorial').getRepository(Contact).findOne({
      where: {
        id:id
      }
    })
  }

  async deleteContact(id: number): Promise<any> {
  const res = await getConnection("tutorial")
                    .createQueryBuilder()
                    .delete()
                    .from(Contact)
                    .where("id=:id",{id:id})
                    .execute();
   return await this.getContact()
  }

  async insertContact(contact: Contact): Promise<any> {
    const res = await getConnection("tutorial")
                      .createQueryBuilder()
                      .insert()
                      .into(Contact)
                      .values(contact)
                      .execute();
    return await this.getContact()
                      
  }

  async updateContact(params: Contact): Promise<any> {
    console.log(params.id);
    const res = await getConnection("tutorial")
                      .createQueryBuilder()
                      .update(Contact)
                      .set(params)
                      .where("id=:id",{id:params.id})
                      .execute()
    return await this.getContact()
  }
}
