import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from '../service/rating.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RatingCreateDto } from '../dto/rating.create.dto';
import { Rating } from '../schema/rating.schema';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(':id')
  async getRating(
    @Param('id') restaurantId,
    @Query('page') page,
    @Query('limit') limit,
  ): Promise<PaginationDto<Rating>> {
    return await this.ratingService.getRatings({ restaurantId, page, limit });
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async writeRating(
    @Req() req,
    @Param('id') targetRestaurantId: string,
    @Body() body: RatingCreateDto,
  ): Promise<Rating> {
    const authorEmail = req.user.email;
    const { content, rating, imgUrls } = body;
    return await this.ratingService.writeRating({
      content,
      rating,
      imgUrls,
      authorEmail,
      targetRestaurantId,
    });
  }
}
