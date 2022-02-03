import { HttpException, Injectable, Options, Param } from '@nestjs/common';
import { userInfo } from 'os';
import { resolve } from 'path/posix';
import { User } from './user.entity';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository, InjectConnection, getConnectionPrefix } from '@nestjs/typeorm';
import { sha256 } from 'js-sha256';

@Injectable()
export class UserService {

    constructor(
        @InjectConnection("tutorial")
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}
    
    //Find user by username
    async getInfo(username : string): Promise<User> {
        return await getConnection('tutorial').getRepository(User).findOne({
            where : {username:username}
        })
    }
    //get all user
    async getUser(): Promise<User[]> {
        console.log('getUser')
        /* return new Promise((resolve, reject)=>{
            resolve(this.list)
        }) */
        return await getConnection('tutorial').getRepository(User).find({
            order: {
                id:'ASC'
            }
        })
    }
    //get user
    async getUserUser(): Promise<User[]> {
        console.log('getUser')
  
        return await getConnection('tutorial').getRepository(User).find({
            where:{
                role:'user'
            },
            order: {
                id:'ASC'
            }
        })
    }
    //get admin
    async getUserAdmin(): Promise<User[]> {
        console.log('getUser')

        return await getConnection('tutorial').getRepository(User).find({
            where:{
                role:'admin'
            },
            order: {
                id:'ASC'
            }
        })
    }

    async getUserById(id:number): Promise<User> {
        console.log('getUserById')
        /* return new Promise((resolve, reject)=>{
            // chercher dans la liste l'utilisateur dont l'id est id
         let list =this.list.find(list => list.id === id);
            if (!list){
                throw new HttpException('this user do not exist', 404)
            }
            resolve(list);
        }) */
        return await getConnection('tutorial').getRepository(User).findOne({
            where: {
                id:id
            }
        })
    } 
    async deleteUser(id:number): Promise<any>{
        //supprimer un user
        /*return new Promise((resolve, reject) => {
            //console.log(this.list)
            let index = this.list.map(function(user){return user.id}).indexOf(id)
            
            if (index === -1) {
                resolve({status:404,message:"user not found"})
            }else{
                this.list.splice(index,1);

                resolve({status:200,list:this.list})
            }
        }).catch(err=>{
            throw new HttpException(err,500); 
        })*/
        // const list = await this.getUser()
        // return {status:200, list:list}
        let userToDelete= await getConnection('tutorial')
                                .getRepository(User).findOne({
                                    where: {
                                        id:id
                                    }
                                })
        const res = await getConnection('tutorial')
                    .getRepository(User)
                    .remove(userToDelete) 
        return await this.getUser()
       
                    
    }


    async insertUser(user:User): Promise<any>{
        //chiffrer le mdp en sha 256
        user.password = sha256(user.password).toString();
                const res = await getConnection('tutorial')
                    .getRepository(User)
                    .save(user)
                    
                return await this.getUser()
    }

    async updateUser(params:User): Promise<any>{
        /// modifier un user dans la liste
        /* console.log(params.id)
        return new Promise((resolve, reject) =>{
            let index = this.list.findIndex(d => d.id === params.id)
            if(index!= -1) {
                this.list[index]=params;    
                resolve(this.list)
            }
        })*/

        let userToUpdate = await getConnection('tutorial')
                                .getRepository(User).findOne({
                                    where: {
                                        id:params.id
                                    }
                                })
         userToUpdate = params;
         const res= await getConnection('tutorial')
                     .getRepository(User)
                     .save(userToUpdate);
                     return await this.getUser()
    }

    async insertUserPhoto(filename: string, username: string): Promise<any>{
        const rest = await getConnection("tutorial")
                            .createQueryBuilder()
                            .update(User)
                            .set({photoProfile:filename})
                            .where("username=:username", {username:username})
                            .execute()
                            return await this.getUser()
    }
 
    
}
