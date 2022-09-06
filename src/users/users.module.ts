import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';

@Module({
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    imports: [TypeOrmModule.forFeature([User]), RolesModule, forwardRef(() => AuthModule)],
    exports: [UsersService, UsersRepository],
})
export class UsersModule {}
