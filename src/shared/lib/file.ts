import * as fs from 'fs';

export class FileLib{
    checkFileExists(path){
        return new Promise((resolve, reject) => {
            fs.access(path, (e)=>{
              //  console.log(`${path} ${e ? 'does not exist' : 'exists'}`);
                let res= e
                resolve(res)
            })
        })
        
    }

    unlinkFile(path){
        return new Promise((resolve, reject)=>{
            fs.unlink(path, (e)=>{
                let res=e
                resolve(res)
            })
        })
    }
} 

