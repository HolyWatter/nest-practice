import { IsNumber } from 'class-validator';

export class PaginationMetaDto {
  @IsNumber()
  totalItems: number;

  @IsNumber()
  currentPage: number;

  @IsNumber()
  totalPages: number;

  @IsNumber()
  hasNext: boolean;

  @IsNumber()
  hasPrev: boolean;
}
