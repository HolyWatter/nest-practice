import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  RawBodyRequest,
} from '@nestjs/common';
import { RestaurantService } from '../service/restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async getAllRestaurant(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.restaurantService.getAllRestaurant({ page, limit });
  }

  @Post()
  registRestaurant(@Body() body) {
    const { restaurantName, thumbnailUrl, description, deliveryFee } = body;

    return this.restaurantService.registRestaurant({
      restaurantName,
      thumbnailUrl,
      description,
      deliveryFee,
    });
  }
}
