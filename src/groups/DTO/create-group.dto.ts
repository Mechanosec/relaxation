import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ description: 'Title', example: 'My group' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'Description', example: 'Group description' })
  @IsString()
  readonly description: string;
}