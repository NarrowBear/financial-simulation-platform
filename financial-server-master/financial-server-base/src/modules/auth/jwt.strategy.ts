import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        return { 
            phone: payload.phone,
            nickName: payload.nickName,
            userUin: payload.userUin,
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName
        };
    }
}