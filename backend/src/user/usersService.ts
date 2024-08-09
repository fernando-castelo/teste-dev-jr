import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.usersRepository.find();
  }

  async getUserById(_id: number) {
    const user = await this.usersRepository.findOneBy({ id: _id });
    if (user) {
      return user;
    }
    throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
  }

  async createUser(user: CreateUserDto) {
    const newUser = await this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id: id });
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    console.log(deleteResponse);
    if (!deleteResponse.affected) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
