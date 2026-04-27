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
import { CreateRoomRequestDto } from './dto/create-room-request.dto';
import { RoomPaginationRequestDto } from './dto/room-pagination-request.dto';
import { RoomResponseDto } from './dto/room-response.dto';
import { UpdateRoomRequestDto } from './dto/update-room-request.dto';
import { RoomService } from './room.service';
import { RequestIdsDto } from 'src/core/dto/request-ids.dto';
import { RoomDetailRequestDto } from './dto/room-detail-request.dto';

@ApiTags('rooms')
@ApiExtraModels(PaginationResponseDto, RoomResponseDto)
@Controller('api/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('all')
  @ApiOperation({ summary: 'Get paginated rooms' })
  @ApiBody({ type: RoomPaginationRequestDto })
  @ApiOkResponse({
    description: 'Paginated list of rooms',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginationResponseDto) },
        {
          properties: {
            items: {
              type: 'array',
              items: { $ref: getSchemaPath(RoomResponseDto) },
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
    @Body() request: RoomPaginationRequestDto,
  ): Promise<PaginationResponseDto<RoomResponseDto>> {
    return this.roomService.paginate(request);
  }

  @Get()
  @ApiOperation({ summary: 'Get room by code' })
  @ApiOkResponse({ type: RoomResponseDto })
  @ApiNotFoundResponse({ description: 'Room not found' })
  detail(@Query() request: RoomDetailRequestDto): Promise<RoomResponseDto> {
    return this.roomService.detail(request);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiCreatedResponse({ type: RoomResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid room payload' })
  @ApiConflictResponse({ description: 'Room code already exists' })
  create(@Body() payload: CreateRoomRequestDto): Promise<RoomResponseDto> {
    return this.roomService.create(payload);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update room by ID' })
  @ApiParam({
    name: 'id',
    description: 'Room ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({ type: RoomResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid room payload' })
  @ApiNotFoundResponse({ description: 'Room not found' })
  @ApiConflictResponse({ description: 'Room code already exists' })
  update(
    @Param() requestIdDto: RequestIdDto,
    @Body() payload: UpdateRoomRequestDto,
  ): Promise<RoomResponseDto> {
    return this.roomService.update(requestIdDto, payload);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete rooms by IDs' })
  @ApiBody({ type: RequestIdsDto })
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid room IDs payload' })
  @ApiNotFoundResponse({ description: 'Room not found' })
  remove(@Body() requestIdsDto: RequestIdsDto): Promise<DeleteResponseDto> {
    return this.roomService.delete(requestIdsDto);
  }
}
