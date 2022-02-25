import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @ApiProperty({ description: 'id', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Role', example: 'admin' })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  role: string;

  @ApiProperty({ description: 'Description', example: 'Administrator role' })
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

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_uuid', referencedColumnName: 'uuid' },
  })
  users: User[];
}
