import { Injectable } from '@nestjs/common';
import { RatingRepository } from '../repository/rating.repository';
import { Rating } from '../schema/rating.schema';
import { UsersRepository } from 'src/users/repository/users.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationMetaDto } from 'src/common/dto/pagination.meta.dto';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepository: RatingRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async getRatings({
    restaurantId,
    limit,
    page,
  }): Promise<PaginationDto<Rating>> {
    const [data, total] = await Promise.all([
      this.ratingRepository.paginateRatings({ page, limit, restaurantId }),
      this.ratingRepository.countAllRatings(),
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
