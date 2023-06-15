import { Injectable } from '@nestjs/common';
import { RatingRepository } from '../repository/rating.repository';
import { Rating } from '../schema/rating.schema';
import { UsersRepository } from 'src/users/repository/users.repository';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async writeRating({
    targetRestaurantId,
    authorEmail,
    content,
    imgUrls,
    rating,
  }): Promise<Rating> {
    const author = await this.userRepository.findEmail(authorEmail);

    return await this.ratingRepository.writeRating({
      author: author.id,
      targetRestaurantId,
      content,
      imgUrls,
      rating,
    });
  }
}
