import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResponseDto } from 'src/core/dto/pagination-response.dto';
import { RequestIdDto } from 'src/core/dto/request-id.dto';
import { DataNotFoundException } from 'src/core/exceptions/data-not-found.exception';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateRoomRequestDto } from './dto/create-room-request.dto';
import { RoomPaginationRequestDto } from './dto/room-pagination-request.dto';
import { RoomResponseDto } from './dto/room-response.dto';
import { UpdateRoomRequestDto } from './dto/update-room-request.dto';
import { RoomEntity } from './entity/room.entity';
import { RequestIdsDto } from 'src/core/dto/request-ids.dto';
import { DeleteResponseDto } from 'src/core/dto/delete-response.dto';
import { RoomDetailRequestDto } from './dto/room-detail-request.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async paginate(
    request: RoomPaginationRequestDto,
  ): Promise<PaginationResponseDto<RoomResponseDto>> {
    const page = request.page ?? 1;
    const limit = request.limit ?? 10;

    const query = this.roomRepository.createQueryBuilder('room');

    if (request.filters?.name) {
      query.andWhere('room.name ILIKE :name', {
        name: `%${request.filters.name}%`,
      });
    }

    if (request.filters?.nameEn) {
      query.andWhere('room.name_en ILIKE :nameEn', {
        nameEn: `%${request.filters.nameEn}%`,
      });
    }

    if (request.filters?.code) {
      query.andWhere('room.code ILIKE :code', {
        code: `%${request.filters.code}%`,
      });
    }

    query
      .orderBy('room.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [entities, total] = await query.getManyAndCount();

    return new PaginationResponseDto(
      entities.map((entity) => new RoomResponseDto(entity)),
      total,
      page,
      limit,
      total === 0 ? 0 : Math.ceil(total / limit),
    );
  }

  async detail(request: RoomDetailRequestDto): Promise<RoomResponseDto> {
    const room = await this.roomRepository.findOneBy({ code: request.code });

    if (!room) {
      throw new DataNotFoundException('Room not found');
    }

    return new RoomResponseDto(room);
  }

  async create(payload: CreateRoomRequestDto): Promise<RoomResponseDto> {
    try {
      const room = this.roomRepository.create(payload);
      const savedRoom = await this.roomRepository.save(room);

      return new RoomResponseDto(savedRoom);
    } catch (error) {
      this.handlePersistenceError(error);
      throw error;
    }
  }

  async update(
    requestIdDto: RequestIdDto,
    payload: UpdateRoomRequestDto,
  ): Promise<RoomResponseDto> {
    const room = await this.roomRepository.findOneBy({ id: requestIdDto.id });

    if (!room) {
      throw new DataNotFoundException('Room not found');
    }

    try {
      const mergedRoom = this.roomRepository.merge(room, payload);
      const updatedRoom = await this.roomRepository.save(mergedRoom);

      return new RoomResponseDto(updatedRoom);
    } catch (error) {
      this.handlePersistenceError(error);
      throw error;
    }
  }

  async delete(requestIdsDto: RequestIdsDto): Promise<DeleteResponseDto> {
    const result = await this.roomRepository.delete(requestIdsDto.ids);

    if (!result.affected) {
      throw new DataNotFoundException('Room not found');
    }

    return {
      message: 'Room deleted successfully',
      deletedCount: result.affected,
    };
  }

  private handlePersistenceError(error: unknown): never | void {
    if (error instanceof QueryFailedError) {
      const dbError = error as QueryFailedError & { code?: string };
      if (dbError.code === '23505') {
        throw new ConflictException('Room code already exists');
      }
    }
  }
}
