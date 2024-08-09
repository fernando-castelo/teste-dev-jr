import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import UsersController from './usersController';
import UsersService from './usersService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
