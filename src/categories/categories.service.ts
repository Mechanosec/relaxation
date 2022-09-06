import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './DTO/create-category.dto';
import { Category } from './categories.entity';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { UpdateCategoryDto } from './DTO/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private categoryRepository: CategoriesRepository) {}

    @Transaction()
    async create(
        createCategoryDto: CreateCategoryDto,
        @TransactionManager() entityManager: EntityManager = null
    ): Promise<Category> {
        const category = entityManager.create(Category, createCategoryDto);
        return await entityManager.save(category);
    }

    @Transaction()
    async update(
        id: number,
        updateCategoryDto: UpdateCategoryDto,
        @TransactionManager() entityManager: EntityManager = null
    ): Promise<Category> {
        const category = await this.categoryRepository.findById(id);
        category.name = updateCategoryDto.name;
        category.description = updateCategoryDto.description;
        return await entityManager.save(category);
    }

    @Transaction()
    async delete(id: number, @TransactionManager() entityManager: EntityManager = null) {
        const category = await this.categoryRepository.findById(id);
        category.deletedAt = new Date().toISOString();
        await entityManager.save(category);
    }
}
