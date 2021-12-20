import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        let role = context.switchToHttp().getRequest().headers.role
        if(role === "admin"){
            return true
        }else{
            return false
        }
    }
}