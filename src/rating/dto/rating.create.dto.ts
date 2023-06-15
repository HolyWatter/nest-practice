import { IsArray, IsNumber, IsString } from 'class-validator';

export class RatingCreateDto {
  @IsString()
  content: string;

  @IsArray()
  imgUrls: string[];

  @IsNumber()
  rating: number;
}
