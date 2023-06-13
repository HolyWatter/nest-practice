import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async registRestaurant({
    restaurantName,
    deliveryFee,
    thumbnailUrl,
    description,
  }) {
    await this.restaurantRepository.registRestaurant({
      name: restaurantName,
      deliveryFee,
      thumbnailUrl,
      description,
    });
  }
}
