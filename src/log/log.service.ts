import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Commercial, Log } from './graph-log.entity';

@Injectable()
export class LogService {
    constructor(
        @InjectConnection("serverDev")
        @InjectRepository(Log)
        private logRepository: Repository<Log>
    ){}
    
    async getList(params: any): Promise<Log[]> {
       // console.log('getList', params.id_user, params.dateDeb, params.dateFin);
        if(params.id_user =="id_user"){
            return await getConnection('serverDev')
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
            return await getConnection('serverDev')
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
      //  console.log('getUsers')
        return await getConnection('serverDev')
                    .query(`
                    select distinct id_user 
                    from logs
                    where  (event='update' or event='insert' or event='delete')     
                    `)
      }
      async getDetailLog(params: any): Promise<Log[]>{
        return await getConnection('serverDev')
            .query(`
               select date, ca, event, id_fiche, convert(query using utf8) as query, route, method
               from logs
               where (date_format(date, '%Y-%m-%d') = ?) and id_user=? and event= ?;
            `,[ params.date, params.id_user, params.event]) 
            
        }
        
       async getDetailUser(id_com: number): Promise<Commercial>{
           return await getConnection('serverDev').getRepository(Commercial).findOne({
            where:{
                id_com:id_com
            }
           })
        }
}
