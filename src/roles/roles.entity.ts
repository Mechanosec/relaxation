import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @ApiProperty({ description: 'Идентификатор', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Роль', example: 'admin' })
  @Column({ type: 'varchar', width: 50, nullable: false })
  role: string;

  @ApiProperty({ description: 'Описание', example: 'Роль администратора' })
  @Column({ type: 'text', unique: true, nullable: false })
  description: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_uuid', referencedColumnName: 'uuid' },
  })
  users: User[];
}
