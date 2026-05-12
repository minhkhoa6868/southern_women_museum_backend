import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResponseDto } from 'src/core/dto/pagination-response.dto';
import { RequestIdDto } from 'src/core/dto/request-id.dto';
import { RequestIdsDto } from 'src/core/dto/request-ids.dto';
import { DataNotFoundException } from 'src/core/exceptions/data-not-found.exception';
import { In, QueryFailedError, Repository } from 'typeorm';
import { ArtifactPaginationRequestDto } from './dto/artifact-pagination-request.dto';
import { ArtifactResponseDto } from './dto/artifact-response.dto';
import { CreateArtifactRequestDto } from './dto/create-artifact-request.dto';
import { UpdateArtifactRequestDto } from './dto/update-artifact-request.dto';
import { UpdateArtifactPositionRequestDto } from './dto/update-artifact-position-request.dto';
import { ArtifactEntity } from './entity/artifact.entity';
import { RoomEntity } from '../room/entity/room.entity';
import { DeleteResponseDto } from 'src/core/dto/delete-response.dto';
import { ArtifactDetailRequestDto } from './dto/artifact-detail-request.dto';
import { SupportedLanguage } from 'src/core/dto/language-request.dto';

@Injectable()
export class ArtifactService {
  constructor(
    @InjectRepository(ArtifactEntity)
    private readonly artifactRepository: Repository<ArtifactEntity>,
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async paginate(
    request: ArtifactPaginationRequestDto,
  ): Promise<PaginationResponseDto<ArtifactResponseDto>> {
    const page = request.page ?? 1;
    const limit = request.limit ?? 10;
    const language = this.normalizeLanguage(
      (request as { language?: string }).language,
    );

    const query = this.artifactRepository.createQueryBuilder('artifact');

    query.leftJoinAndSelect('artifact.room', 'rooms');

    if (request.filters?.roomId) {
      query.andWhere('artifact.room_id = :roomId', {
        roomId: request.filters.roomId,
      });
    }

    if (request.filters?.name) {
      query.andWhere('artifact.name ILIKE :name', {
        name: `%${request.filters.name}%`,
      });
    }

    query
      .orderBy('artifact.orderNo', 'ASC')
      .addOrderBy('artifact.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [entities, total] = await query.getManyAndCount();

    return new PaginationResponseDto(
      entities.map((entity) => new ArtifactResponseDto(entity, language)),
      total,
      page,
      limit,
      total === 0 ? 0 : Math.ceil(total / limit),
    );
  }

  async detail(
    request: ArtifactDetailRequestDto,
  ): Promise<ArtifactResponseDto> {
    const language = this.normalizeLanguage(
      (request as { language?: string }).language,
    );
    const artifact = await this.artifactRepository.findOne({
      where: {
        roomId: request.roomId,
        orderNo: request.orderNo,
      },
      relations: { room: true },
    });

    if (!artifact) {
      throw new DataNotFoundException('Artifact not found');
    }

    return new ArtifactResponseDto(artifact, language);
  }

  async getRandomArtifacts(language?: string): Promise<ArtifactResponseDto[]> {
    const normalizedLanguage = this.normalizeLanguage(language);

    const randomRows = await this.artifactRepository
      .createQueryBuilder('artifact')
      .select('artifact.id', 'id')
      .orderBy('RANDOM()')
      .take(6)
      .getRawMany<{ id: string }>();

    if (randomRows.length === 0) {
      return [];
    }

    const randomIds = randomRows.map((row) => row.id);
    const entities = await this.artifactRepository.find({
      where: { id: In(randomIds) },
      relations: { room: true },
    });

    const orderMap = new Map(randomIds.map((id, index) => [id, index]));
    entities.sort(
      (a, b) =>
        (orderMap.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
        (orderMap.get(b.id) ?? Number.MAX_SAFE_INTEGER),
    );

    return entities.map(
      (entity) => new ArtifactResponseDto(entity, normalizedLanguage),
    );
  }

  async create(
    payload: CreateArtifactRequestDto,
  ): Promise<ArtifactResponseDto> {
    const language = this.normalizeLanguage(
      (payload as { language?: string }).language,
    );
    await this.ensureRoomExists(payload.roomId);

    try {
      const nextOrderNo = await this.getNextOrderNo(payload.roomId);
      const artifact = this.artifactRepository.create({
        ...payload,
        orderNo: nextOrderNo,
      });
      const savedArtifact = await this.artifactRepository.save(artifact);
      const artifactWithRoom = await this.artifactRepository.findOne({
        where: { id: savedArtifact.id },
        relations: { room: true },
      });

      return new ArtifactResponseDto(
        artifactWithRoom ?? savedArtifact,
        language,
      );
    } catch (error) {
      this.handlePersistenceError(error);
      throw error;
    }
  }

  async update(
    requestIdDto: RequestIdDto,
    payload: UpdateArtifactRequestDto,
  ): Promise<ArtifactResponseDto> {
    const language = this.normalizeLanguage(
      (payload as { language?: string }).language,
    );
    const artifact = await this.artifactRepository.findOneBy({
      id: requestIdDto.id,
    });

    if (!artifact) {
      throw new DataNotFoundException('Artifact not found');
    }

    if (payload.roomId && payload.roomId !== artifact.roomId) {
      await this.ensureRoomExists(payload.roomId);
    }

    try {
      const mergedArtifact = this.artifactRepository.merge(artifact, payload);
      const updatedArtifact =
        await this.artifactRepository.save(mergedArtifact);
      const artifactWithRoom = await this.artifactRepository.findOne({
        where: { id: updatedArtifact.id },
        relations: { room: true },
      });

      return new ArtifactResponseDto(
        artifactWithRoom ?? updatedArtifact,
        language,
      );
    } catch (error) {
      this.handlePersistenceError(error);
      throw error;
    }
  }

  async updatePosition(
    requestIdDto: RequestIdDto,
    payload: UpdateArtifactPositionRequestDto,
  ): Promise<ArtifactResponseDto> {
    const language = this.normalizeLanguage(
      (payload as { language?: string }).language,
    );
    const artifact = await this.artifactRepository.findOneBy({
      id: requestIdDto.id,
    });

    if (!artifact) {
      throw new DataNotFoundException('Artifact not found');
    }

    const mergedArtifact = this.artifactRepository.merge(artifact, payload);
    const updatedArtifact = await this.artifactRepository.save(mergedArtifact);
    const artifactWithRoom = await this.artifactRepository.findOne({
      where: { id: updatedArtifact.id },
      relations: { room: true },
    });

    return new ArtifactResponseDto(
      artifactWithRoom ?? updatedArtifact,
      language,
    );
  }

  async delete(requestIdsDto: RequestIdsDto): Promise<DeleteResponseDto> {
    const result = await this.artifactRepository.delete(requestIdsDto.ids);

    if (!result.affected) {
      throw new DataNotFoundException('Artifact not found');
    }

    return {
      message: 'Artifact deleted successfully',
      deletedCount: result.affected,
    };
  }

  private handlePersistenceError(error: unknown): never | void {
    if (error instanceof QueryFailedError) {
      const dbError = error as QueryFailedError & { code?: string };

      if (dbError.code === '23505') {
        throw new ConflictException('Artifact code already exists');
      }

      if (dbError.code === '23503') {
        throw new DataNotFoundException('Room not found');
      }
    }
  }

  private async ensureRoomExists(roomId: string): Promise<void> {
    const room = await this.roomRepository.findOneBy({ id: roomId });

    if (!room) {
      throw new DataNotFoundException('Room not found');
    }
  }

  private async getNextOrderNo(roomId: string): Promise<number> {
    const latestArtifact = await this.artifactRepository.findOne({
      where: { roomId },
      order: { orderNo: 'DESC' },
      select: { orderNo: true },
    });

    if (!latestArtifact) {
      return 1;
    }

    return latestArtifact.orderNo + 1;
  }

  private normalizeLanguage(language?: string): SupportedLanguage {
    return language === 'en' ? 'en' : 'vi';
  }
}
