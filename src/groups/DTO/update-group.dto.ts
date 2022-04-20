import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({ description: 'Title', example: 'My group' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'Description', example: 'Group description' })
  @IsString()
  readonly description: string;
}
