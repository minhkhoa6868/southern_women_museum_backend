import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { DeleteResponseDto } from 'src/core/dto/delete-response.dto';
import { PaginationResponseDto } from 'src/core/dto/pagination-response.dto';
import { RequestIdDto } from 'src/core/dto/request-id.dto';
import { RequestIdsDto } from 'src/core/dto/request-ids.dto';
import { ArtifactService } from './artifact.service';
import { ArtifactPaginationRequestDto } from './dto/artifact-pagination-request.dto';
import { ArtifactResponseDto } from './dto/artifact-response.dto';
import { CreateArtifactRequestDto } from './dto/create-artifact-request.dto';
import { UpdateArtifactRequestDto } from './dto/update-artifact-request.dto';
import { ArtifactDetailRequestDto } from './dto/artifact-detail-request.dto';

@ApiTags('artifacts')
@ApiExtraModels(PaginationResponseDto, ArtifactResponseDto)
@Controller('api/artifacts')
export class ArtifactController {
  constructor(private readonly artifactService: ArtifactService) {}

  @Post('all')
  @ApiOperation({ summary: 'Get paginated artifacts' })
  @ApiBody({ type: ArtifactPaginationRequestDto })
  @ApiOkResponse({
    description: 'Paginated list of artifacts',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginationResponseDto) },
        {
          properties: {
            items: {
              type: 'array',
              items: { $ref: getSchemaPath(ArtifactResponseDto) },
            },
          },
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid pagination or filter payload',
  })
  paginate(
    @Body() request: ArtifactPaginationRequestDto,
  ): Promise<PaginationResponseDto<ArtifactResponseDto>> {
    return this.artifactService.paginate(request);
  }

  @Get()
  @ApiOperation({ summary: 'Get artifact by room ID and order no' })
  @ApiOkResponse({ type: ArtifactResponseDto })
  @ApiNotFoundResponse({ description: 'Artifact not found' })
  detail(
    @Query() request: ArtifactDetailRequestDto,
  ): Promise<ArtifactResponseDto> {
    return this.artifactService.detail(request);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new artifact' })
  @ApiCreatedResponse({ type: ArtifactResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid artifact payload' })
  @ApiConflictResponse({ description: 'Artifact code already exists' })
  @ApiNotFoundResponse({ description: 'Room not found' })
  create(
    @Body() payload: CreateArtifactRequestDto,
  ): Promise<ArtifactResponseDto> {
    return this.artifactService.create(payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update artifact by ID' })
  @ApiParam({
    name: 'id',
    description: 'Artifact ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({ type: ArtifactResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid artifact payload' })
  @ApiNotFoundResponse({ description: 'Artifact or room not found' })
  @ApiConflictResponse({ description: 'Artifact code already exists' })
  update(
    @Param() requestIdDto: RequestIdDto,
    @Body() payload: UpdateArtifactRequestDto,
  ): Promise<ArtifactResponseDto> {
    return this.artifactService.update(requestIdDto, payload);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete artifacts by IDs' })
  @ApiBody({ type: RequestIdsDto })
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid artifact IDs payload' })
  @ApiNotFoundResponse({ description: 'Artifact not found' })
  remove(@Body() requestIdsDto: RequestIdsDto): Promise<DeleteResponseDto> {
    return this.artifactService.delete(requestIdsDto);
  }
}
