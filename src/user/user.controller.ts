import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {RegisterDto} from "./dto/register.dto";
import {LoggInResponse, RegisterUserResponse} from "../types/user";
import {LoggInDto} from "./dto/loggIn.dto";

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ) {
    }

    @Post('/register')
    register(
        @Body() newUser: RegisterDto
    ): Promise<RegisterUserResponse> {
        return this.userService.register(newUser);
    }

    @Get('/logg-in')
    loggIn(
        @Body() user: LoggInDto
    ): Promise<LoggInResponse> {
        return this.userService.loggIn(user);
    }


}
