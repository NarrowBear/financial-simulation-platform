import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from '../../common/web/response.dto';
import { RegisterDto } from '../account/dto/register-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() body: RegisterDto): Promise<Response<any>> {
        return Response.success(await this.authService.register(body));
    }

    @Post('login')
    async login(@Body() body: { account: string, password: string }): Promise<Response<any>> {
        if(!body.account || !body.password) {
            return Response.error('Account and password are required', 400);
        }
        return Response.success(await this.authService.login(body.account, body.password));
    }

    @Post('refresh')
    async refresh(@Body('refresh_token') refreshToken: string): Promise<Response<any>> {
        return Response.success(await this.authService.refreshToken(refreshToken));
    }
}