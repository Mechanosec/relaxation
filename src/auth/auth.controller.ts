import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/DTO/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/DTO/login-user.dto';
import TokenResponse from './responseTransformer/token.response';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Sing-in' })
    @Post('sing-in')
    async login(@Body() loginUserDto: LoginUserDto) {
        const token = await this.authService.singIn(loginUserDto);

        return new TokenResponse(token);
    }

    @ApiOperation({ summary: 'Sing-up' })
    @Post('sing-up')
    async singUp(@Body() createUserDto: CreateUserDto) {
        const token = await this.authService.singUp(createUserDto);

        return new TokenResponse(token);
    }
}
