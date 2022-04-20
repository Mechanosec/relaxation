import { ResponseTransformer } from '../../extensions/response.transformer';
import { Category } from '../categories.entity';
import ICategoryResponse from './icategory.response';

export default class CategoryResponse extends ResponseTransformer<Category> {
  protected toArray(entity: Category): ICategoryResponse {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  protected implements(entity: Category): any {

  }
}
