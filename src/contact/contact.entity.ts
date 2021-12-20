import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
@Entity({name: 'contact'})
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tel: string;

  @Column()
  email: string;

  @Column()
  adress: string;

  @Column()
  zipcode: string;

  @Column()
  city: string;

  list: Contact;
}

