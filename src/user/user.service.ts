import {Injectable} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {LoggInResponse, RegisterUserResponse} from "../types/user";
import {User} from "./user.entity";
import {LoggInDto} from "./dto/loggIn.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

    async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
        const checkUser = await User.findOne({
            where: {
                name: newUser.name,
            }
        })

        if (checkUser) {
            return {
                isSuccess: false
            }
        }

        const user = new User();
        user.name = newUser.name;
        await bcrypt.hash(newUser.pass, 10, (err, hash) => {
            if (hash) {
                console.log('Logged in', hash);
                user.hashPass = hash;
            } else {
                console.log('Failed', err)
            }
        })

        user.units = newUser.units;

        await user.save();

        return {
            isSuccess: true,
        }
    }

    async getOneUser(id: string): Promise<User> {
        return await User.findOneOrFail({where: {id}});
    }

    async loggIn(user: LoggInDto): Promise<LoggInResponse> {
        const foundUser = await User.findOne({
            where: {
                name: user.name
            }
        })

        const isMatch = await bcrypt.compare(user.pass, foundUser.hashPass);
        if (isMatch) {
            return {
                isSuccess: true,
                token: foundUser.token,
            }
        } else {
            return {
                isSuccess: false,
            }
        }
    }
}
