import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository, InjectConnection, getConnectionPrefix } from '@nestjs/typeorm';
import { resolve } from 'path/posix';
import { Md5 } from 'ts-md5/dist/md5';
import { sha256, sha224 } from 'js-sha256';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()

export class LoginService {

    list:User[]=[]
    constructor(
        private jwtService: JwtService,

        @InjectConnection("tutorial")
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}
   
    async getUser(): Promise<User[]> {
   
        return await getConnection('tutorial').getRepository(User).find({
            order: {
                username:'ASC'
            }
        })
    }
    async getUserByUsername(username:string): Promise<User> {

       
        return await getConnection('tutorial').getRepository(User).findOne({
            where: {
                username:username
            }
        })
    }   
   
    async login(params:any): Promise<any> {

        const user = await getConnection('tutorial').getRepository(User).findOne({
            where: {username:params.username}
        });
        console.log("getUserByName")
        // crypter le user.password en md5
        // comparer user.passwrd a params.password
        // si les deux sont identiques alors user connecté
      let passwordParamsSha256 = sha256(params.password).toString();
        console.log("user", user.password)
        console.log("param", passwordParamsSha256)
        if(user && user.password === passwordParamsSha256  ) {
            console.log ("logged in!")
            const {password, username,...rest} =user;
            const accessToken = this.jwtService.sign({payload:user},{expiresIn:3600})
            return {access_token: accessToken,
                    role:user.role,
                    username:user.username,
                    firstname:user.firstname,
                    id:user.id,
                    name:user.name,
                    photoProfile:user.photoProfile,
                    };
        } else{
            console.log("wrong password")
        }
        
        return null ;
    }

    async validateUser(payload: any) : Promise<boolean> {
        console.log(payload)
        const user = await getConnection('tutorial').getRepository(User).findOne({
            where: {id:payload.id}
        })
        if(user.password==payload.password){
            return true;
        }else{
            return false;
        }
    }
    
}
