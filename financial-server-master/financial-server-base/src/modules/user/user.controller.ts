import { Controller, Get, Req, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { Response } from "src/common/web/response.dto";
import { JwtAdvancedFilter } from "../auth/jwt-advanced.filter";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("portfolio")
    @UseInterceptors(JwtAdvancedFilter)
    async getPortfolio(@Req() req: any): Promise<Response<any>> {
        return Response.success(await this.userService.getPortfolio(req.user));
    }
} 