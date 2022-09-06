import { BaseRepository } from '../extensions/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { In, Repository } from 'typeorm';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class CategoriesRepository extends BaseRepository {
    constructor(@InjectRepository(Category) private repository: Repository<Category>) {
        super();
    }

    async findById(id: number): Promise<Category> {
        return await this.repository.findOne({ where: { id: id } });
    }

    async findByIds(ids: number[]): Promise<Category[]> {
        return await this.repository.find({ where: { id: In(ids) } });
    }

    async findList(): Promise<Category[]> {
        return await this.repository.find();
    }
}
