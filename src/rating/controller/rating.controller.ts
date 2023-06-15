import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RatingService } from '../service/rating.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RatingCreateDto } from '../dto/rating.create.dto';
import { Rating } from '../schema/rating.schema';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

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
