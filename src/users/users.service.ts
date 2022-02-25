import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './users.entity';
import { RolesService } from '../roles/roles.service';
import { USER } from '../roles/roles.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const role = await this.roleService.getById(USER);
    if (!role) {
      throw new HttpException('Role is not exist', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.create(dto);
    user.roles = [role];
    return await this.userRepository.save(user);
  }

  async getId(uuid: string): Promise<User> {
    return await this.userRepository.findOne({ where: { uuid } });
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
