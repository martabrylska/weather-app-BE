import {Body, Controller, Inject, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {RegisterDto} from "./dto/register.dto";
import {RegisterUserResponse, Units, UpdateUserResponse, UserPayload} from "../types/user";
import {UpdatePasswordDto} from "./dto/updatePassword.dto";
import {AuthGuard} from "../auth/auth.guard";
import {UserObj} from "../decorators/user-obj.decorator";

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ) {
    }

    @Post('/register')
    async register(
        @Body() newUser: RegisterDto
    ): Promise<RegisterUserResponse> {
        return this.userService.register(newUser);
    }

    @UseGuards(AuthGuard)
    @Patch('/password')
    async updatePassword(
        @UserObj() user: UserPayload,
        @Body() password: UpdatePasswordDto
    ): Promise<UpdateUserResponse> {
        return this.userService.updatePassword(password, user.username);
    }

    @UseGuards(AuthGuard)
    @Patch('/units/:units')
    async updateUnits(
        @UserObj() user: UserPayload,
        @Param('units') units: Units,
    ): Promise<UpdateUserResponse> {
        return this.userService.updateUnits(units, user.username);
    }


}
