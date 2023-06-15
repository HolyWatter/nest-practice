import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { Restaurant } from '../schema/restaurant.schema';
import { PaginationMetaDto } from 'src/common/dto/pagination.meta.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  async getAllRestaurant({ limit, page }): Promise<PaginationDto<Restaurant>> {
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

  async uploadThumbnail({ id, file }) {
    const fineName = file.filename;
    const url = `http://localhost:8000/media/thumbnail/${fineName}`;

    return await this.restaurantRepository.uploadThumbnail({
      id,
      url,
    });
  }
}
