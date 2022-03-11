import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'E-mail', example: 'test@test.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password', example: '12345' })
  @IsString()
  @Length(8, 50)
  password: string;

  @ApiProperty({ description: 'First name', example: 'Ivan' })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'Second Name', example: 'Jovanovich' })
  @IsString()
  readonly secondName: string;

  @ApiProperty({ description: 'Birthday', example: '2021-09-09' })
  @IsDateString({}, { message: 'Incorrect date format' })
  readonly birthday: Date;
}
