import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/module/users.module';
import { AuthModule } from './auth/module/auth.module';

@Module({
  imports: [
    //.env 사용하기 위한 모듈
    ConfigModule.forRoot(),
    //app 모듈 몽구스 연결 모듈
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
