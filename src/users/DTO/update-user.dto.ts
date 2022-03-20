import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'E-mail', example: 'test@test.com' })
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty({ description: 'First name', example: 'Ivan' })
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty({ description: 'Second Name', example: 'Jovanovich' })
  @IsString()
  @IsOptional()
  readonly secondName: string;

  @ApiProperty({ description: 'Birthday', example: '2021-09-09' })
  @IsDateString({}, { message: 'Incorrect date format' })
  @IsOptional()
  readonly birthday: Date;
}