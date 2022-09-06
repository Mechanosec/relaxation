import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './categories.entity';
import { CreateCategoryDto } from './DTO/create-category.dto';
import CategoryResponse from './responseTransformer/category.response';
import { UpdateCategoryDto } from './DTO/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoryRepository: CategoriesRepository, private categoryService: CategoriesService) {}

    @ApiOperation({ summary: 'Get one' })
    @ApiResponse({ status: 200, type: Category })
    @Get('/:id')
    async get(@Param('id') id: number) {
        return await this.categoryRepository.findById(id);
    }

    @ApiOperation({ summary: 'Get list' })
    @ApiResponse({ status: 200, type: [Category] })
    @Get()
    async getAll() {
        return this.categoryRepository
            .findList()
            .then((categories) => {
                return new CategoryResponse().items(categories);
            })
            .catch((error) => {
                return error;
            });
    }

    @ApiOperation({ summary: 'Create' })
    @ApiResponse({ status: 200, type: Category })
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService
            .create(createCategoryDto)
            .then((category) => {
                return new CategoryResponse().item(category);
            })
            .catch((error) => {
                return error;
            });
    }

    @ApiOperation({ summary: 'Update' })
    @ApiResponse({ status: 200, type: Category })
    @Put('/:id')
    async update(@Param('id') id: number, updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService
            .update(id, updateCategoryDto)
            .then((category) => {
                return new CategoryResponse().item(category);
            })
            .catch((error) => {
                return error;
            });
    }

    @ApiOperation({ summary: 'Delete' })
    @ApiResponse({ status: 200 })
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.categoryService
            .delete(id)
            .then(() => {
                return 'Category wa deleted';
            })
            .catch((error) => {
                return error;
            });
    }
}
