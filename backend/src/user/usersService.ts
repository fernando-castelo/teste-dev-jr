import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { DeletedUserResponse, UserResponse } from './interface/UserResponse';

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

  async createUser(user: CreateUserDto): Promise<UserResponse<User>> {
    const newUser = await this.usersRepository.create(user);
    const createdUser = await this.usersRepository.save(newUser);
    return {
      data: createdUser,
      status: 'Created',
    };
  }

  async updateUser(
    id: number,
    user: UpdateUserDto,
  ): Promise<UserResponse<User>> {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id: id });
    if (updatedUser) {
      return {
        data: updatedUser,
        status: 'Updated',
      };
    }
    throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: number): Promise<DeletedUserResponse> {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return {
      id: id,
      status: 'Deleted',
    };
  }
}
