import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString } from 'class-validator';
import { schemaOptions } from 'src/common/utils/schema.options';

@Schema(schemaOptions)
export class Rating {
  @Prop({
    required: true,
  })
  @IsString()
  content: string;

  @Prop({
    required: true,
  })
  @IsString()
  author: string;

  @Prop({
    required: true,
  })
  @IsNumber()
  rating: number;

  @Prop({
    default: [],
  })
  imgUrls: string[];

  @Prop({
    required: true,
  })
  target: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
