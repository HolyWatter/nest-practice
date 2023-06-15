import { IsArray } from 'class-validator';
import { PaginationMetaDto } from './pagination.meta.dto';

export class PaginationDto<T> {
  data: Array<T>;
  meta: PaginationMetaDto;
}
