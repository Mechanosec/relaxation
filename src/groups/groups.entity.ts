import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('groups')
export class Group {
  @ApiProperty({
    description: 'uuid',
    example: '7703ea42-610a-4507-9036-6540d59cd73a',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Title', example: 'My group' })
  @Column({ type: 'varchar', length: 150, nullable: false })
  title: string;

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
