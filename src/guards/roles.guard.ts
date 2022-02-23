import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.get<string[]>(
        ROLES_KEY,
        context.getHandler(),
      );
      if (!requiredRoles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers.authorization;
      if (!authorization) {
        throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
      }
      const [bearer, token] = authorization.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Incorrect token',
        });
      }

      request.user = this.jwtService.verify(token);
      if (
        !request.user.roles.some((role) => requiredRoles.includes(role.role))
      ) {
        throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
      }
      return true;
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(e.getResponse(), e.getStatus());
      } else {
        throw new UnauthorizedException({
          message: 'Incorrect token',
        });
      }
    }
  }
}
