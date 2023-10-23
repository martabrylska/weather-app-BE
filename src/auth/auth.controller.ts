import {Body, Controller, Post, HttpCode, HttpStatus, Get, Request, UseGuards, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "./auth.guard";
import {Response} from "express";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {UserObj} from "../decorators/user-obj.decorator";
import {UserPayload} from "../types/user";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body() user: AuthLoginDto,
        @Res({passthrough: true}) res: Response) {
        return this.authService.login(user.name, user.password, res);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        console.log(req.user);
        return req.user;
    }

    @UseGuards(AuthGuard)
    @Get('logout')
    async logout(@UserObj() user: UserPayload, @Res() res: Response) {
        return this.authService.logout(user.username,res)
    }

}
