import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToGroupDto {
  @ApiProperty({
    description: 'Group guid',
    example: '8e459236-e937-4fc4-9867-03f6dfe72ba5',
  })
  @IsString()
  readonly guid: string;

  @ApiProperty({
    description: 'User guids',
    example: '[8e459236-e937-4fc4-9867-03f6dfe72ba5]',
  })
  @IsArray()
  readonly userGuids: string[];
}
