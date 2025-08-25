import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { AccountService } from "./account.service";
import { Account } from "./entities/account.entity";
import { Response } from "src/common/web/response.dto";


@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get()
    async getAccounts(): Promise<Response<Account[]>> {
        return Response.success(await this.accountService.findAll());
    }

    @Get(':id')
    getAccountById(@Param('id') id: string) {
        return this.accountService.findOne({ id: parseInt(id) });
    }

    @Post()
    async createAccount(@Body() account: Partial<Account>): Promise<Response<Account>> {
        return Response.success(await this.accountService.create(account));
    }

    @Put(':id')
    async updateAccount(@Param('id') id: string, @Body() account: Partial<Account>): Promise<Response<Account>> {
        return Response.success(await this.accountService.update(parseInt(id), account));
    }

}