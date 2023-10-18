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
        user.units = newUser.units;
        // await bcrypt.hash(newUser.password, 10, function (err, hash) {
        //     if (hash) {
        //         (async () => {
        //             user.hashPass = hash;
        //             await user.save();
        //
        //         })()
        //     } else {
        //         console.log(err)
        //         return {
        //             isSuccess: false,
        //         }
        //     }
        // });

        user.hashPass = await bcrypt.hash(newUser.password, 10);
        await user.save();

        return {
            isSuccess: true,
            id: user.id,
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

        const isMatch = await bcrypt.compare(user.password, foundUser.hashPass);
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
