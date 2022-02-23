import { ResponseTransformer } from '../../extensions/response.transformer';
import { User } from '../users.entity';
import { RoleResponse } from '../../roles/responseTransformer/role.response';

interface IUserResponse {
  uuid: string;
  email: string;
  firstName: string;
  secondName: string;
}

export class UserResponse extends ResponseTransformer<User> {
  toArray(entity: User): IUserResponse {
    return {
      uuid: entity.uuid,
      email: entity.email,
      firstName: entity.firstName,
      secondName: entity.secondName,
    };
  }

  implements(entity: User) {
    return {
      roles: new RoleResponse().items(entity?.roles),
    };
  }
}
