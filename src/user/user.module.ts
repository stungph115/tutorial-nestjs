import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/login/jwt-auth.guard';
import { JwtStrategy } from 'src/login/jwt.strategy';
@Module({
  providers: [UserService,],
  controllers: [UserController],
  imports:[
    TypeOrmModule.forFeature([User], "tutorial")
    ],
  exports: [UserService]
})

export class UserModule {}
