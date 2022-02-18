import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'Роль', example: 'admin' })
  readonly role: string;

  @ApiProperty({ description: 'Описание', example: 'Роль администратора' })
  readonly description: string;
}
