import { Blob } from 'buffer';
import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'user'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  nationality: string;

  @Column()
  dob: Date;

  @Column()
  tel: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;
  
  @Column()
  sex: string;

  @Column()
  email: string;

  @Column()
  photoProfile: string;

  list: User;
  user:User;
}
