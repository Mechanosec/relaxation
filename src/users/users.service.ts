import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './users.model';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const defaultUserRole = 2; //роль пользователя по умолчанию user
    const role = await this.roleService.getById(defaultUserRole);
    await user.$set('roles', [defaultUserRole]);
    user.roles = [role];
    return user;
  }

  async getId(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll({ include: { model: Role } });
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email }, include: { model: Role } });
  }
}
