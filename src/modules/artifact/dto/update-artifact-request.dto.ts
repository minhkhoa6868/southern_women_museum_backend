import { PartialType } from '@nestjs/swagger';
import { CreateArtifactRequestDto } from './create-artifact-request.dto';

export class UpdateArtifactRequestDto extends PartialType(
  CreateArtifactRequestDto,
) {}
