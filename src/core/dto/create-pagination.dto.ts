import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationRequestDto } from './pagination-request.dto';

export function createPaginationDto<T>(FilterDto: new () => T) {
  class PaginationDto extends PaginationRequestDto<T> {
    @ValidateNested()
    @Type(() => FilterDto)
    declare filters?: T;
  }
  return PaginationDto;
}
