import { Domain } from "./domain.model";

export class AuthModel extends Domain {
    username: string;
    password: string;
    role: string;
    token: string;
    isLoggedIn: boolean;
    constructor(id?, username?, password?, role?, token?, isLoggedIn?) {
        super();
        this.id = id ? id : 0;
        this.username = username ? username : '';
        this.password = password ? password : '';
        this.role = role ? role : 'user';
        this.token = token ? token : 'fake-jwt-token';
        this.isLoggedIn = isLoggedIn ? isLoggedIn : false;
    }
}
