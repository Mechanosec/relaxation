import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './DTO/create-category.dto';
import { Category } from './categories.entity';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoriesRepository) {}

  @Transaction()
  async create(
    createCategoryDto: CreateCategoryDto,
    @TransactionManager() entityManager: EntityManager = null,
  ): Promise<Category> {
    const category = entityManager.create(Category, createCategoryDto);
    return await entityManager.save(category);
  }
}
