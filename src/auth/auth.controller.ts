import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/DTO/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/DTO/login-user.dto';
import { TokenResponse } from './responseTransformer/token.response';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return new TokenResponse().item(await this.authService.login(loginUserDto));
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @Post('singUp')
  async singUp(@Body() createUserDto: CreateUserDto) {
    return new TokenResponse().item(
      await this.authService.singUp(createUserDto),
    );
  }
}
