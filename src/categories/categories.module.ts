import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';

@Module({
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesRepository],
    imports: [TypeOrmModule.forFeature([Category])],
    exports: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
