import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRole } from "./users-role.model";

interface RoleCreationAttrs {
    role: string
    description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({ description: 'Идентификатор', example: '1' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ description: 'Роль', example: 'admin' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    role: string

    @ApiProperty({ description: 'Описание', example: 'Роль администратора' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    description: string

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}