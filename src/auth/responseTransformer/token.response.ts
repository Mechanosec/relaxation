import { ResponseTransformer } from '../../extensions/response.transformer';

interface ITokenResponse {
  token: string;
}

export class TokenResponse extends ResponseTransformer<any> {
  protected implements(entity: any): any {
    return {};
  }

  protected toArray(token: string): ITokenResponse {
    return {
      token: token,
    };
  }
}
