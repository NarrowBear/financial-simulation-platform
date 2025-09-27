import { Controller, Post, Body, Req, Headers, UseInterceptors, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from '../../common/web/response.dto';
import { RegisterDto } from '../account/dto/register-dto';
import { JwtAdvancedFilter } from './jwt-advanced.filter';
import { Request } from 'express';

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

    @Get('me')
    @UseInterceptors(JwtAdvancedFilter)
    async me(@Req() req: any): Promise<Response<any>> {
        console.log(req);
        if (!req.isAuthenticated) {
            return Response.error('Authentication required', 401);
        }
        return Response.success(await this.authService.me(req.user));
    }

}