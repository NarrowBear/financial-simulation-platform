import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { Response } from "src/common/web/response.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<Response<User[]>> {
        return Response.success(await this.userService.findAll());
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Response<User | null>> {
        return Response.success(await this.userService.findOne({ id: parseInt(id) }));
    }

    @Post()
    async create(@Body() user: Partial<User>): Promise<Response<User>> {
        return Response.success(await this.userService.create(user));
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: Partial<User>): Promise<Response<User>> {
        return Response.success(await this.userService.update(parseInt(id), user));
    }
} 