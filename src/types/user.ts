export interface RegisterUserResponse {
    isSuccess: boolean;
    id?: string;
    msg?: string;
}

export interface SignInResponse {
    isSuccess: boolean;
    msg?: string;
}

export interface UserPayload {
    username: string;
    sub: string;
    iat: number;
    exp: number;

}