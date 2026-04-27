import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponseDto {
  constructor(message: string, deletedCount: number) {
    this.message = message;
    this.deletedCount = deletedCount;
  }

  @ApiProperty({
    description: 'Success message',
    example: 'Deleted successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Number of deleted records',
    example: 1,
  })
  deletedCount: number;
}
