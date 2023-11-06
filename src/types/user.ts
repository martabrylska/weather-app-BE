export interface RegisterUserResponse {
    isSuccess: boolean;
    id?: string;
    msg?: string;
}

export interface SignInResponse {
    isSuccess: boolean;
    name?: string;
    units?: Units;
    msg?: string;
}

export interface UpdateUserResponse {
    isSuccess: boolean;
    id?: string;
    msg?: string;
}

export interface UserPayload {
    username: string;
    sub: string;
    iat: number;
    exp: number;
}

export type Units = 'metric' | 'imperial' | 'standard';