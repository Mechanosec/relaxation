import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/DTO/create-user.dto';
import { LoginUserDto } from '../users/DTO/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.validate(loginUserDto);
    return this.generateToken(user);
  }

  async singUp(createUserDto: CreateUserDto): Promise<string> {
    if (await this.userService.getByEmail(createUserDto.email)) {
      throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 5);
    const newUser = await this.userService.createUser(createUserDto);
    return this.generateToken(newUser);
  }

  private generateToken(user: User): string {
    const payload = { email: user.email, roles: user.roles };
    return this.jwtService.sign(payload);
  }

  private async validate(loginUserDto: LoginUserDto): Promise<User> {
    const error = new UnauthorizedException({
      message: 'Incorrect email and password',
    });
    const user = await this.userService.getByEmail(loginUserDto.email);
    if (!user) {
      throw error;
    }

    const passwordEquals = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw error;
    }

    return user;
  }
}
