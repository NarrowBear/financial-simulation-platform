import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from '../../common/web/response.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { phone: string, password: string }): Promise<Response<any>> {
        return Response.success(await this.authService.login(body.phone, body.password));
    }

    @Post('refresh')
    async refresh(@Body('refresh_token') refreshToken: string): Promise<Response<any>> {
        return Response.success(await this.authService.refreshToken(refreshToken));
    }
}