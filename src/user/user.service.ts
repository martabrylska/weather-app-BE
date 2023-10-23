import {Injectable} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {RegisterUserResponse} from "../types/user";
import {User} from "./user.entity";
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
                isSuccess: false,
                msg: "Given name already exists."
            }
        }

        const user = new User();
        user.name = newUser.name;
        user.units = newUser.units;
        user.hashPass = await bcrypt.hash(newUser.password, 10);
        await user.save();

        return {
            isSuccess: true,
            id: user.id,
        }

    }

    async getOneUser(name: string): Promise<User | undefined> {
        return await User.findOne({where: {name}});
    }

}
