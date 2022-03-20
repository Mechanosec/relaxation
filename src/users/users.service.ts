import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { User } from './users.entity';
import { USER } from '../roles/roles.constants';
import { UsersRepository } from './users.repository';
import { RolesRepository } from '../roles/roles.repository';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './DTO/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private roleRepository: RolesRepository,
  ) {}

  @Transaction()
  async create(
    dto: CreateUserDto,
    @TransactionManager() unitOfWork: EntityManager = null,
  ): Promise<User> {
    console.log(dto);
    const role = await this.roleRepository.findById(USER);
    const user = unitOfWork.create(User, dto);
    // user.password = await bcrypt.hash(createUserDto.password, 5);
    user.roles = [role];
    return await unitOfWork.save(user);
  }

  @Transaction()
  async update(
    guid: string,
    updateUserDto: UpdateUserDto,
    @TransactionManager() unitOfWork: EntityManager = null,
  ): Promise<User> {
    const user = await this.userRepository.findByGuid(guid);
    user.email = updateUserDto.email;
    user.firstName = updateUserDto.firstName;
    user.secondName = updateUserDto.secondName;
    user.birthday = updateUserDto.birthday;
    return await unitOfWork.save(user);
  }
}
