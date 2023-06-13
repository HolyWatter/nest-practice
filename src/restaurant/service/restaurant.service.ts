import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { Restaurant } from '../schema/restaurant.schema';
import { PaginationMetaDto } from 'src/common/dto/pagination.meta.dto';

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

  async getAllRestaurant({
    limit,
    page,
  }): Promise<{ data: Restaurant[]; meta: PaginationMetaDto }> {
    const [data, total] = await Promise.all([
      this.restaurantRepository.paginateRestaurant({ page, limit }),
      this.restaurantRepository.countAllRestaurant(),
    ]);

    const meta: PaginationMetaDto = {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
    return {
      data,
      meta,
    };
  }
}
