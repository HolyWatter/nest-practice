import { Module } from '@nestjs/common';
import { RatingController } from '../controller/rating.controller';
import { RatingService } from '../service/rating.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from '../schema/rating.schema';
import { RatingRepository } from '../repository/rating.repository';
import { UsersModule } from 'src/users/module/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
    UsersModule,
  ],
  controllers: [RatingController],
  providers: [RatingService, RatingRepository],
})
export class RatingModule {}
