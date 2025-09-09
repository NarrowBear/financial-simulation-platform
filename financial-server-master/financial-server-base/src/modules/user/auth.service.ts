import { UserService } from "./user.service";

export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) {}
}