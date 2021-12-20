import { Injectable } from '@nestjs/common';
import { File } from './file.entity';
import * as path from 'path';
import * as fs from 'fs';
import { fileLoader } from 'ejs';
import { extname, resolve } from 'path/posix';
import { rejects } from 'assert';

@Injectable()
export class UploadService {
    fileList: File []=[]
    constructor(){}
    async GetFileListing(): Promise<File []> {
        return new Promise((resolve, rejects) =>{
            const directoryPath = path.join(__dirname, '../../../', 'download/file-uploaded');            
           // console.log('before fs.readdir')            
              fs.readdir(directoryPath, (err, file) =>  {                
                if(err) {
                    return console.log('unable to scan directory: ' + err);
                }
                file.forEach( file => {                  
                    if(!this.fileList.find(o => o.name === file && o.type === extname(file)))
                    {   // console.log(file);
                        this.fileList.push({name: file,type: extname(file)}); 
                    }                   
                });
                resolve(this.fileList) 
                console.log(this.fileList)
            });   
           // console.log('after fs.readdir')             
           /* fs.promises.readdir(directoryPath)
           .then(file => {               
                file.forEach( file => {
                    this.fileList.push({name: file,type: extname(file) 
                    });
                    resolve(this.fileList) 
                    console.log("this file list",this.fileList)
                })    
           }) 
           .catch(err => {
               console.log(err)
           })       */
        })
    }
}