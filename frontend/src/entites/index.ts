export interface User {
    id: number;
    nomeCompleto: string;
    email: string;
}

export interface UserCreateDto {
    nomeCompleto: string;
    email: string;
}

export interface UserUpdateDto {
    id: number;
    nomeCompleto: string;
    email: string;
}