import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserModule} from "../user/user.module";
import {jwtConstant} from "../config/config";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstant.secret,
            signOptions: {expiresIn: '24h'},
        })],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {
}
