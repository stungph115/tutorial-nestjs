
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { JwtPayload } from './jwt-payload.interface'; 
import { LoginService } from './login.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private loginService : LoginService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
  //  console.log("JwtStrategy{}.validate()", payload);
    const user = await this.loginService.validateUser(payload.payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}