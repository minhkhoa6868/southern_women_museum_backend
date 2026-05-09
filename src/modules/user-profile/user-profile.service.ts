import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entity/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfile(id: string) {
    const profile = await this.userRepository.findOne({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException('User Profile not found');
    }
    return profile;
  }

  async update(id: string, updateDto: UpdateProfileDto) {
    const profile = await this.userRepository.findOne({ where: { id } });
    if (!profile) {
      throw new NotFoundException('User Profile not found');
    }

    await this.userRepository.update(profile.id, updateDto);
    return this.getProfile(id);
  }
}