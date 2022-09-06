import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/roles.entity';
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
import { Group } from '../groups/groups.entity';

@Entity('users')
export class User {
    @ApiProperty({
        description: 'guid',
        example: '7703ea42-610a-4507-9036-6540d59cd73a',
    })
    @PrimaryGeneratedColumn('uuid')
    guid: string;

    @ApiProperty({ description: 'E-mail', example: 'test@test.com' })
    @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
    email: string;

    @ApiProperty({ description: 'Password', example: '12345' })
    @Column({ type: 'varchar', length: 150, nullable: false })
    password: string;

    @ApiProperty({ description: 'First name', example: 'Ivan' })
    @Column({ name: 'first_name', type: 'varchar', length: 100, nullable: false })
    firstName: string;

    @ApiProperty({ description: 'Second Name', example: 'Jovanovich' })
    @Column({
        name: 'second_name',
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    secondName: string;

    @ApiProperty({ description: 'Birthday', example: '2021-09-09' })
    @Column({
        name: 'birthday',
        type: 'date',
        nullable: false,
    })
    birthday: Date;

    @ApiProperty({ description: 'Created at', example: 'some date' })
    @CreateDateColumn({ name: 'created_at' })
    createdAt;

    @ApiProperty({ description: 'Updated at', example: 'some date' })
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt;

    @ApiProperty({ description: 'Deleted at', example: 'some date' })
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt;

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'users_roles',
        joinColumn: { name: 'user_guid', referencedColumnName: 'guid' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })
    roles: Role[];

    @ManyToMany(() => Group)
    @JoinTable({
        name: 'users_groups',
        joinColumn: { name: 'user_guid', referencedColumnName: 'guid' },
        inverseJoinColumn: { name: 'group_guid', referencedColumnName: 'guid' },
    })
    groups: Group[];
}
