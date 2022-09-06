import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { GroupsRepository } from './groups.repository';
import { Group } from './groups.entity';

@Module({
    controllers: [GroupsController],
    providers: [GroupsService, GroupsRepository],
    imports: [TypeOrmModule.forFeature([Group]), UsersModule, AuthModule],
    exports: [GroupsService, GroupsRepository],
})
export class GroupsModule {}
