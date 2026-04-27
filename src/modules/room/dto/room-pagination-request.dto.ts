import { createPaginationDto } from 'src/core/dto/create-pagination.dto';
import { RoomFiltersDto } from './room-filters.dto';

export class RoomPaginationRequestDto extends createPaginationDto(
  RoomFiltersDto,
) {}
