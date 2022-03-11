import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';

@Entity('groups')
export class Group {
  @ApiProperty({
    description: 'guid',
    example: '7703ea42-610a-4507-9036-6540d59cd73a',
  })
  @PrimaryGeneratedColumn('uuid')
  guid: string;

  @ApiProperty({ description: 'Title', example: 'My group' })
  @Column({ type: 'varchar', length: 150, nullable: false })
  title: string;

  @ApiProperty({ description: 'Description', example: 'Group description' })
  @Column({ type: 'text' })
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

  @ManyToMany(() => User)
  @JoinTable
  users: User[];
}
