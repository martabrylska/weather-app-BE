import {Body, Controller, Post, HttpCode, HttpStatus, Get, Request, UseGuards, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "./auth.guard";
import {Response} from "express";
import {AuthLoginDto} from "./dto/auth-login.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body() user: AuthLoginDto,
        @Res({passthrough: true}) response: Response) {
        return this.authService.signIn(user.name, user.password, response);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        console.log(req.user);
        return req.user;
    }
}
