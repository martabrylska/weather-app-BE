import {Injectable} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {RegisterUserResponse, Units, UpdateUserResponse} from "../types/user";
import {User} from "./user.entity";
import * as bcrypt from 'bcrypt';
import {UpdatePasswordDto} from "./dto/updatePassword.dto";


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

    async updatePassword(password: UpdatePasswordDto, name): Promise<UpdateUserResponse>{
        const foundUser = await User.findOne({
            where: {
                name,
            }
        })

        const isMatch = await bcrypt.compare(password.currentPassword, foundUser.hashPass);

        if (!isMatch) {
            return {
                isSuccess: false,
                msg: "Wrong current password."
            }
        }

        foundUser.hashPass = await bcrypt.hash(password.newPassword, 10);
        await foundUser.save();

        return {
            isSuccess: true,
            id: foundUser.id,
        }
    }

    async updateUnits(units: Units, name: string): Promise<UpdateUserResponse> {

        const user = await User.update({name}, {units})

        return {
            isSuccess: true,
            // id: user.id,
        }
    }
}
