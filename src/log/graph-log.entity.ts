import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({name: 'logs'})
export class Log {
    @PrimaryGeneratedColumn()
    id_log: number

    @Column()
    date: Date

    @Column()
    id_user: number

    @Column()
    CA: string

    @Column()
    Event: string

    @Column()
    id_fiche: number
    
    @Column()
    Query: string

    @Column()
    route: string

    @Column()
    method: string



}

