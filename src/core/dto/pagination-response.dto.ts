import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
  constructor(
    items: T[],
    total: number,
    page: number,
    limit: number,
    totalPages: number,
  ) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = totalPages;
  }

  items: T[];

  @ApiProperty({
    description: 'Total number of items',
    example: 125,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 13,
  })
  totalPages: number;
}
