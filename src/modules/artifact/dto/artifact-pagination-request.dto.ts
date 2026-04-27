import { createPaginationDto } from 'src/core/dto/create-pagination.dto';
import { ArtifactFiltersDto } from './artifact-filters.dto';

export class ArtifactPaginationRequestDto extends createPaginationDto(
  ArtifactFiltersDto,
) {}
