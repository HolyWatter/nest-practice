import { IsBoolean, IsNumber } from 'class-validator';

export class PaginationMetaDto {
  @IsNumber()
  totalItems: number;

  @IsNumber()
  currentPage: number;

  @IsNumber()
  totalPages: number;

  @IsBoolean()
  hasNext: boolean;

  @IsBoolean()
  hasPrev: boolean;
}
