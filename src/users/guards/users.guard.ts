import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ApiResponseMsg } from '@app/libs/errors/api-response-msg';

@Injectable({ scope: Scope.REQUEST })
export class UsersGuard implements CanActivate {
  constructor(
    private authService: AuthService
  ) { }
async  canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization
   if(!authorization){
      ApiResponseMsg.errorResponse("please insert authorization header ", 403)
   }
    const token = authorization.split(' ')[1];

    if (!token) {
      return false;
    }

    const decoded =await   this.authService.validateToken(token)


    if (decoded !== null) {
      request.user = decoded; // Set the payload in the request context
      console.log('@@@@@@@@@@@@@@@{request.user}',request.user);
    }
    return decoded !== null;
  }



}
