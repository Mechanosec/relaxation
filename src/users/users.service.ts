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
  ) { }

  @Transaction()
  async create(
    createUserDto: CreateUserDto,
    @TransactionManager() entityManager: EntityManager = null,
  ): Promise<User> {
    const role = await this.roleRepository.findById(USER);
    const user = entityManager.create(User, createUserDto);
    user.password = await bcrypt.hash(createUserDto.password, 5);
    user.roles = [role];
    return await entityManager.save(user);
  }

  @Transaction()
  async update(
    guid: string,
    updateUserDto: UpdateUserDto,
    @TransactionManager() entityManager: EntityManager = null,
  ): Promise<User> {
    const user = await this.userRepository.findByGuid(guid);
    user.email = updateUserDto.email;
    user.firstName = updateUserDto.firstName;
    user.secondName = updateUserDto.secondName;
    user.birthday = updateUserDto.birthday;
    return await entityManager.save(user);
  }

  @Transaction()
  async delete(
    guid: string,
    @TransactionManager() entityManager: EntityManager = null,
  ) {
    const user = await this.userRepository.findByGuid(guid);
    user.deletedAt = new Date().toISOString();
    await entityManager.save(user);
  }
}
