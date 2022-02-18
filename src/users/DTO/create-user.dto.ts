import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'E-mail', example: 'test@test.com' })
  readonly email: string;

  @ApiProperty({ description: 'Пароль', example: '12345' })
  password: string;

  @ApiProperty({ description: 'Имя', example: 'Иван' })
  readonly firstName: string;

  @ApiProperty({ description: 'Фамилия', example: 'Иванович' })
  readonly secondName: string;
}
