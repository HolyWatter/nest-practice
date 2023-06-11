import { Module } from '@nestjs/common';
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../service/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/users.schema';
import { UsersRepository } from '../repository/users.repository';

@Module({
  imports: [
    // 네임 및 스키마 필요
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
