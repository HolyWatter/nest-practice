import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from '../schema/restaurant.schema';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantRepository {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly RestaurantModel: Model<Restaurant>,
  ) {}

  async registRestaurant({ name, description, deliveryFee, thumbnailUrl }) {
    return await this.RestaurantModel.create({
      restaurantName: name,
      description,
      deliveryFee,
      thumbnailUrl,
    });
  }

  async paginateRestaurant({ page, limit }) {
    const skip = (page - 1) * limit;
    const items = await this.RestaurantModel.find().skip(skip).limit(limit);

    return items;
  }

  async countAllRestaurant() {
    return await this.RestaurantModel.count();
  }
}
