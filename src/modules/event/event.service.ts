import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entity/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventResponseDto } from './dto/event-response.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<EventResponseDto> {
    const event = this.eventsRepository.create({
      title: createEventDto.title,
      description: createEventDto.description,
      date: createEventDto.date,
      imageUrl: createEventDto.imageUrl,
      status: createEventDto.status,
    });
    const saved = await this.eventsRepository.save(event);
    return new EventResponseDto(saved);
  }

  async findAll(): Promise<EventResponseDto[]> {
    const events = await this.eventsRepository.find({ order: { date: 'DESC' } });
    return events.map((e) => new EventResponseDto(e));
  }

  async findOne(id: string): Promise<EventResponseDto> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return new EventResponseDto(event);
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<EventResponseDto> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    await this.eventsRepository.update(id, {
      ...(updateEventDto.title !== undefined && { title: updateEventDto.title }),
      ...(updateEventDto.description !== undefined && { description: updateEventDto.description }),
      ...(updateEventDto.date !== undefined && { date: updateEventDto.date }),
      ...(updateEventDto.imageUrl !== undefined && { imageUrl: updateEventDto.imageUrl }),
      ...(updateEventDto.status !== undefined && { status: updateEventDto.status }),
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    await this.eventsRepository.remove(event);
  }
}
