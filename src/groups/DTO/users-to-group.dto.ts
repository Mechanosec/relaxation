import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsersToGroupDto {
  @ApiProperty({
    description: 'User guids',
    example: '[8e459236-e937-4fc4-9867-03f6dfe72ba5]',
  })
  @IsArray()
  readonly userGuids: string[];
}
