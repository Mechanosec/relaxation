import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRole } from "src/roles/users-role.model";

interface UserCreationAttrs {
    login: string
    password: string
    firstName: string
    secondName: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ description: 'Идентификатор', example: '1' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ description: 'Логин', example: 'test' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    login: string

    @ApiProperty({ description: 'Пароль', example: '12345' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @ApiProperty({ description: 'E-mail', example: 'test@test.com' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({ description: 'Имя', example: 'Иван' })
    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string

    @ApiProperty({ description: 'Фамилия', example: 'Иванович' })
    @Column({ type: DataType.STRING, allowNull: false })
    secondName: string

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]
}