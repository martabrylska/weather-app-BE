import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {jwtConstant} from "../config/config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies.jwt;
        if (!token) {
            throw new UnauthorizedException()
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstant.secret
                }
            );
            request['user'] = payload;
        } catch (e) {
            throw new UnauthorizedException()
        }
        return true;
    }

    // private extractTokenFromHeader(request: Request): string | undefined {
    //     const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //     return type === 'Bearer' ? token : undefined;
    // }
}