import { ResponseTransformer } from '../../extensions/response.transformer';
import { User } from '../users.entity';
import RoleResponse from '../../roles/responseTransformer/role.response';
import IUserResponse from './iuser.response';

export default class UserResponse extends ResponseTransformer<User> {
    toArray(entity: User): IUserResponse {
        return {
            guid: entity.guid,
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
