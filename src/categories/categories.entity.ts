import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
    @ApiProperty({ description: 'id', example: '1' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Name', example: 'test' })
    @Column({ type: 'varchar', length: '150', unique: true, nullable: false })
    name: string;

    @ApiProperty({ description: 'Description', example: 'test' })
    @Column({ type: 'text', nullable: false })
    description: string;

    @ApiProperty({ description: 'Created at', example: 'some date' })
    @CreateDateColumn({ name: 'created_at' })
    createdAt;

    @ApiProperty({ description: 'Updated at', example: 'some date' })
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt;

    @ApiProperty({ description: 'Deleted at', example: 'some date' })
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt;
}
