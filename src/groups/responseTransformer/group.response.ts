import { ResponseTransformer } from '../../extensions/response.transformer';
import { Group } from '../groups.entity';
import UserResponse from '../../users/responseTransformer/user.response';
import IGroupResponse from './igroup.response';

export default class GroupResponse extends ResponseTransformer<Group> {
  protected toArray(entity: Group): IGroupResponse {
    return {
      guid: entity.guid,
      title: entity.title,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  protected implements(entity: Group): any {
    return {
      users: new UserResponse().items(entity.users),
    };
  }
}
