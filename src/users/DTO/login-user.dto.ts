import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'E-mail', example: 'test@test.com' })
  readonly email: string;

  @ApiProperty({ description: 'Пароль', example: '12345' })
  readonly password: string;
}
