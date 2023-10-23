import {Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {Response} from "express";
import {v4 as uuid} from "uuid";
import {User} from "../user/user.entity";
import {SignInResponse} from "../types/user";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
    }

    private async generateToken(user: User): Promise<string> {
        let token;
        let userWithThisToken = null;
        do {
            token = uuid();
            userWithThisToken = await User.findOne({where: {currentTokenId: token}});
        } while (!!userWithThisToken)
        user.currentTokenId = token;
        await user.save();

        return token;
    }

    async login(name: string, pass: string, res: Response): Promise<SignInResponse> {
        const user = await this.userService.getOneUser(name);
        const isMatch = await bcrypt.compare(pass, user.hashPass);
        if (!isMatch || !user) {
            return {
                isSuccess: false,
                msg: 'Incorrect login data.',
            }
        }
        const currentTokenId = await this.generateToken(user);
        const payload = {sub: currentTokenId, username: user.name};
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '24h',
        });
        // response.setHeader('token', token);
        res.cookie('jwt', token, {
            secure: false,
            domain: 'localhost',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
        });
        return {
            isSuccess: true,
        };
    }

    async logout(name: string, res: Response) {
        try {
            const loggedUser = await this.userService.getOneUser(name);
            loggedUser.currentTokenId = null;
            await loggedUser.save();
            res.clearCookie(
                'jwt',
                {
                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                }
            );
            return res.json({isSuccess: true});
        } catch (e) {
            return res.json({
                isSuccess: false,
                msg: e.message,
            });
        }
    }
}