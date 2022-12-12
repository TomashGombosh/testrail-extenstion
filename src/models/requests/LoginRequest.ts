export class LoginRequest {
    readonly email;
    readonly password;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}