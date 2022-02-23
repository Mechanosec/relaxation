import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/roles.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ description: 'Идентификатор', example: '1' })
  @PrimaryGeneratedColumn('uuid')
  uuid: number;

  @ApiProperty({ description: 'E-mail', example: 'test@test.com' })
  @Column({ type: 'varchar', width: 100, unique: true, nullable: false })
  email: string;

  @ApiProperty({ description: 'Пароль', example: '12345' })
  @Column({ type: 'varchar', width: 150, nullable: false })
  password: string;

  @ApiProperty({ description: 'Имя', example: 'Иван' })
  @Column({ name: 'first_name', type: 'varchar', width: 100, nullable: false })
  firstName: string;

  @ApiProperty({ description: 'Фамилия', example: 'Иванович' })
  @Column({ name: 'second_name', type: 'varchar', width: 100, nullable: false })
  secondName: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_uuid', referencedColumnName: 'uuid' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
