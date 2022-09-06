import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
    @ApiProperty({ description: 'Name', example: 'test' })
    readonly name: string;

    @ApiProperty({ description: 'Description', example: 'test' })
    readonly description: string;
}
