import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async login(phone: string, password: string) {
        const user = await this.userService.findOne({ phone, password });
        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { 
            phone: user.phone, 
            nickName: user.nickName, 
            userUin: user.userUin,
            realName: user.realName,
        };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }

    async refreshToken(refreshToken: string) {
        const payload = this.jwtService.verify(refreshToken);
        if(!payload) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
        };
    }
}