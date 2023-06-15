import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from '../schema/rating.schema';
import { Model } from 'mongoose';

@Injectable()
export class RatingRepository {
  constructor(
    @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
  ) {}

  async paginateRatings({ page, limit, restaurantId }) {
    const skip = (page - 1) * limit;
    const items = await this.ratingModel
      .find({ target: restaurantId })
      .skip(skip)
      .limit(limit);

    return items;
  }

  async countAllRatings() {
    return await this.ratingModel.count();
  }

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
