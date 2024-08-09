import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './createUserDto';
import { IsNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  id: number;
}
