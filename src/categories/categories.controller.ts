import { Body, Controller, Get, Param } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './categories.entity';
import { CreateCategoryDto } from './DTO/create-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private categoryRepository: CategoriesRepository,
    private categoryService: CategoriesService,
  ) {}

  @ApiOperation({ summary: 'Get one' })
  @ApiResponse({ status: 200, type: Category })
  @Get('/:id')
  async get(@Param('id') id: number) {
    return await this.categoryRepository.findById(id);
  }

  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }
}
