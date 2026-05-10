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
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.update(id, {
      firstName: updateDto.first_name,
      lastName: updateDto.last_name,
      phone: updateDto.phone,
      email: updateDto.email,
      language: updateDto.language,
      isNotificationEnabled: updateDto.is_notification_enabled,
    });

    return this.getProfile(id);
  }
}