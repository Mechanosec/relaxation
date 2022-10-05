import { Exclude } from 'class-transformer';

export default class TokenResponse {
    @Exclude()
    token: string;

    constructor(token: string) {
        this.token = token;
    }
}
