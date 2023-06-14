import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantService } from '../service/restaurant.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';

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

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('image', multerOptions('thumbnail')))
  uploadThumbnail(@UploadedFile() file: Express.Multer.File, @Param('id') id) {
    return this.restaurantService.uploadThumbnail({ id, file });
  }
}
