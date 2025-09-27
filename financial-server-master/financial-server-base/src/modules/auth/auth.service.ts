import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from '../account/dto/register-dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async register(body: RegisterDto): Promise<Boolean> {
        const { phone, password, nickName, avatar, idCard, email, firstName, lastName } = body;
        const hasPhone = await this.userService.exists({ phone });
        if(hasPhone) {
            console.log('User already exists');
            throw new BadRequestException('User already exists');
        }
        const hasEmail = await this.userService.exists({ email });
        if(hasEmail) {
            throw new BadRequestException('Email already exists');
        }
        
        // keep userUin unique
        let userUin = uuidv4();
        while(await this.userService.exists({ userUin })) {
            userUin = uuidv4();
        }
        const createdTime = new Date();
        const updatedTime = new Date();
        await this.userService.create({ phone, password, nickName, avatar, idCard, email, firstName, lastName, userUin, createdTime, updatedTime });
        return true;
    }

    async login(account: string, password: string) {
        const user = await this.userService.findOne([{ phone: account }, { email: account }]);
        if(!user || user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { 
            phone: user.phone, 
            nickName: user.nickName, 
            userUin: user.userUin,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        console.log(payload);
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

    async me(user: any) {
        return {
            phone: user.phone,
            nickName: user.nickName,
            userUin: user.userUin,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
    }
}