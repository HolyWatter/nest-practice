import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signup(userInfo) {
    const { email, password, nickname } = userInfo;

    const isEmailExist = await this.usersRepository.existEmail(email);

    if (isEmailExist) {
      return false;
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await this.usersRepository.signup({
      email,
      password: hashPassword,
      nickname,
    });

    return user.readOnlyData;
  }
}
