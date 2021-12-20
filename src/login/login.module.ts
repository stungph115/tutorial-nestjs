import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
@Module({
  controllers: [LoginController],
  imports:[
    PassportModule,
    TypeOrmModule.forFeature([User], "tutorial"),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  
  providers: [LoginService,JwtStrategy,  ],
  exports: [LoginService, ],
})
export class LoginModule {}
