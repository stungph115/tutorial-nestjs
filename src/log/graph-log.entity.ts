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
    ca: string

    @Column()
    event: string

    @Column()
    id_fiche: number
    
    @Column()
    query: string

    @Column()
    route: string

    @Column()
    method: string



}        


@Entity({name: 'commercial'})
export class Commercial {
    @PrimaryGeneratedColumn()
    id_com: number

    @Column()
    id_equipe: Date

    @Column()
    nom_com: string

    @Column()
    prenom_com: string

    @Column()
    tel: number

    @Column()
    fax: number
    
    @Column()
    email: string

}

