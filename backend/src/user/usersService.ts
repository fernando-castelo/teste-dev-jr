import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { DeletedUserResponse, UserResponse } from './interface/UserResponse';
import UserNotFoundException from './exceptions/userNotFoundException';

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
    throw new UserNotFoundException(_id);
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
    throw new UserNotFoundException(id);
  }

  async deleteUser(id: number): Promise<DeletedUserResponse> {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new UserNotFoundException(id);
    }
    return {
      id: id,
      status: 'Deleted',
    };
  }
}
