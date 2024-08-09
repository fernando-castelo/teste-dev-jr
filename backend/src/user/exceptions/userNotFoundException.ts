import { NotFoundException } from '@nestjs/common';

class UserNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super(`Usuario com id ${userId} não encontrado`);
  }
}

export default UserNotFoundException;
