import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Campo nome deve ser String' })
  @IsNotEmpty({ message: 'Campo nome deve ser preenchido' })
  nomeCompleto: string;

  @IsEmail({}, { message: 'Campo email deve estar em formato valido' })
  @IsNotEmpty({ message: 'Campo email deve ser preenchido' })
  email: string;
}
