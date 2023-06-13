import { Module } from '@nestjs/common';
import { RestaurantController } from '../controller/restaurant.controller';
import { RestaurantService } from '../service/restaurant.service';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from '../schema/restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantRepository],
})
export class RestaurantModule {}
