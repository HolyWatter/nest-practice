import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from '../schema/rating.schema';
import { Model } from 'mongoose';

@Injectable()
export class RatingRepository {
  constructor(
    @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
  ) {}

  async writeRating({
    imgUrls,
    rating,
    content,
    author,
    targetRestaurantId,
  }): Promise<Rating> {
    return await this.ratingModel.create({
      imgUrls,
      rating,
      content,
      author,
      target: targetRestaurantId,
    });
  }
}
