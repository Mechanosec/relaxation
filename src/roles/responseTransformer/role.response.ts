import { ResponseTransformer } from '../../extensions/response.transformer';
import { Role } from '../roles.entity';
import IRoleResponse from './irole.response';

export default class RoleResponse extends ResponseTransformer<Role> {
  protected toArray(entity: Role): IRoleResponse {
    return {
      id: entity.id,
      role: entity.role,
    };
  }

  protected implements(entity: Role): any {
    return {};
  }
}
