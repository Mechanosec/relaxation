import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './DTO/create-category.dto';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoriesRepository) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(dto);
  }
}
