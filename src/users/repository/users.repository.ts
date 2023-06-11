import { Injectable } from '@nestjs/common';
import { User } from '../schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signup(userInfo) {
    const { email, password, nickname } = userInfo;

    const newUser = await this.userModel.create({
      email,
      password,
      nickname,
    });

    return newUser;
  }

  async existEmail(email: string): Promise<boolean> {
    const isExist = await this.userModel.findOne({
      email,
    });

    if (isExist) return true;
    else return false;
  }
}
