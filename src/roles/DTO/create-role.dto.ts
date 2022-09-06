import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ description: 'Role', example: 'admin' })
    readonly role: string;

    @ApiProperty({ description: 'Description', example: 'Administrator role' })
    readonly description: string;
}
