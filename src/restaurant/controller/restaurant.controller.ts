import { Body, Controller, Get, Post, RawBodyRequest } from '@nestjs/common';
import { RestaurantService } from '../service/restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  getAllRestaurant() {
    return 'wait!!';
  }

  @Post()
  registRestaurant(@Body() body) {
    const { restaurantName, thumbnailUrl, description, deliveryFee } = body;

    this.restaurantService.registRestaurant({
      restaurantName,
      thumbnailUrl,
      description,
      deliveryFee,
    });
  }
}
