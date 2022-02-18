import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/DTO/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/DTO/login-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @Post('singUp')
  singUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.singUp(createUserDto);
  }
}
