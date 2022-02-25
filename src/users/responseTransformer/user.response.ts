import { ResponseTransformer } from '../../extensions/response.transformer';
import { User } from '../users.entity';
import { RoleResponse } from '../../roles/responseTransformer/role.response';

interface IUserResponse {
  uuid: string;
  email: string;
  firstName: string;
  secondName: string;
  createdAt;
  updatedAt;
}

export class UserResponse extends ResponseTransformer<User> {
  toArray(entity: User): IUserResponse {
    return {
      uuid: entity.uuid,
      email: entity.email,
      firstName: entity.firstName,
      secondName: entity.secondName,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  implements(entity: User): any {
    return {
      roles: new RoleResponse().items(entity?.roles),
    };
  }
}
