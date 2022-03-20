import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesRepository } from './roles.repository';
import { Role } from './roles.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RolesService, RolesRepository],
})
export class RolesModule {}
