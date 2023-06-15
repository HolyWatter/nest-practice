import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { schemaOptions } from 'src/common/utils/schema.options';

@Schema(schemaOptions)
export class Restaurant extends Document {
  @Prop({
    required: true,
  })
  @IsString()
  restaurantName: string;

  @Prop({
    default: '',
  })
  @IsString()
  thumbnilUrl: string;

  @Prop({
    required: true,
  })
  @IsString()
  description: string;

  @Prop({
    required: true,
  })
  @IsNumber()
  deliveryFee: number;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
