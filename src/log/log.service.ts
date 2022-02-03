import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Log } from './graph-log.entity';

@Injectable()
export class LogService {
    constructor(
        @InjectConnection("tutorial")
        @InjectRepository(Log)
        private logRepository: Repository<Log>
    ){}
    async getList(params: any): Promise<Log[]> {
        console.log('getList', params.id_user, params.dateDeb, params.dateFin);
        if(params.id_user =="id_user"){
            return await getConnection('tutorial')
            .query(`
               select distinct date_format(date, '%Y-%m-%d') as lastdate,
               sum(case when logs.event='update' then 1 else 0 end) as countUpdate,
               sum(case when logs.event='insert' then 1 else 0 end) as countInsert,
               sum(case when logs.event='delete' then 1 else 0 end)as countDelete
               from logs
               where (date_format(date, '%Y-%m-%d') between ? and ?)
               group by lastdate asc;

            `,[ params.dateDeb, params.dateFin]) 
        }
        else{
            return await getConnection('tutorial')
            .query(`
               select distinct date_format(date, '%Y-%m-%d') as lastdate,
               sum(case when logs.event='update' then 1 else 0 end) as countUpdate,
               sum(case when logs.event='insert' then 1 else 0 end) as countInsert,
               sum(case when logs.event='delete' then 1 else 0 end)as countDelete
               from logs
               where (date_format(date, '%Y-%m-%d') between ? and ?) and id_user=?
               group by lastdate asc;

            `,[ params.dateDeb, params.dateFin, params.id_user]) 
        }
       
      }
      async getUser(): Promise<any> {   
        console.log('getUsers')
        return await getConnection('tutorial')
                    .query(`
                    select distinct id_user 
                    from logs
                    where  (event='update' or event='insert' or event='delete') 
                    `)
      }
}
