import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'E-mail', example: 'test@test.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Пароль', example: '12345' })
  @IsString()
  @Length(4, 10)
  password: string;

  @ApiProperty({ description: 'Имя', example: 'Иван' })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'Фамилия', example: 'Иванович' })
  @IsString()
  readonly secondName: string;
}
