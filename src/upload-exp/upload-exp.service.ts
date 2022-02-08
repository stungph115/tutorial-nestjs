import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { File } from './file.entity';
import * as path from 'path';
import * as fs from 'fs';
import { extname } from 'path/posix';
import { FileLib } from 'src/shared/lib/file';

@Injectable()
export class UploadExpService {
    constructor(
        @InjectConnection("local")
        @InjectRepository(File)
        private fileRepository: Repository<File>,
        private file: FileLib
    ){}
    async GetFileListing(): Promise<File[]>{
        console.log('get file')
        return await getConnection('local').getRepository(File).find({
            order:{
                num:'ASC'
            }
        })
    }
    async insertFile(filename:string, ca:string, title: string, username: string ): Promise<any>{
        const rest = await getConnection("local")
                            .createQueryBuilder()
                            .insert()
                            .into(File)
                            .values({
                                num: null,
                                file: filename,
                                ca: ca,
                                title: title,
                                username: username
                            })
                            .execute()
    }

    async deleteFile(file: string): Promise<any>{
        const directoryPath = path.join(__dirname, '../../../', 'download/archive-exp/',file);            
        console.log(directoryPath)
        var ext = extname(file)
      
        if(ext){
            console.log("this file has extension : ",ext)
             try {
                const res = await this.file.checkFileExists(directoryPath)
                if(res){console.log('file does not exist in directory')}
                else{
                    console.log('deleting')
                    const res = await this.file.unlinkFile(directoryPath)
                    if(!res){
                        let fileToDelete= await getConnection('local')
                        .getRepository(File).findOne({
                            where: {file:file}
                        })
                        const res = await getConnection('local')
                                        .getRepository(File)
                                        .remove(fileToDelete) 
                        return await this.GetFileListing()
                    }
                }  
                
            } catch(err) {console.error(err)}          
        }
        else{console.log('file do not have extension')}    
    }
}
