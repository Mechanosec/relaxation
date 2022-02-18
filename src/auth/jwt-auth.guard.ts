import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers.authorization;
      if (!authorization) {
        throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
      }
      const [bearer, token] = authorization.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Incorrect token' });
      }

      request.user = this.jwtService.verify(token);
      return true;
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(e.getResponse(), e.getStatus());
      } else {
        throw new UnauthorizedException({ message: 'Incorrect token' });
      }
    }
  }
}
