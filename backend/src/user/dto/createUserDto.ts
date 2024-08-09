import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nomeCompleto: string;

  @IsString()
  email: string;
}
