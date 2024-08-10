export interface User {
    id: string;
    nomeCompleto: string;
    email: string;
}

export interface UserCreateDto {
    nomeCompleto: string;
    email: string;
}