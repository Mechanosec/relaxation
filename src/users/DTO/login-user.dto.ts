import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: 'E-mail', example: 'test@test.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password', example: '12345' })
  @IsString()
  @Length(8, 50)
  readonly password: string;
}
