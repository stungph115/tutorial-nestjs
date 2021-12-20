import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'archivage'})
export class File {
  @PrimaryGeneratedColumn()
  num: number;

  @Column()
  file: string;

  @Column()
  ca: string;

  @Column()
  username: string;

  @Column()
  date: Date;

  @Column()
  title: string;


  list: File;
}
