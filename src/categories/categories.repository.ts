import { BaseRepository } from '../extensions/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { In, Repository } from 'typeorm';
import { CreateCategoryDto } from './DTO/create-category.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository extends BaseRepository {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {
    super();
  }

  async save(dto: CreateCategoryDto): Promise<Category> {
    const category = this.repository.create(dto);
    return await this.repository.save(category);
  }

  async findById(id: number): Promise<Category> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findByIds(ids: number[]): Promise<Category[]> {
    return await this.repository.find({ where: { id: In(ids) } });
  }
}
