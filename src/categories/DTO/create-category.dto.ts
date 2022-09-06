import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({ description: 'Name', example: 'test' })
    readonly name: string;

    @ApiProperty({ description: 'Description', example: 'test' })
    readonly description: string;
}
