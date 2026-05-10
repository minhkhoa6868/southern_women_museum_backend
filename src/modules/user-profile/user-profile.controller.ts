import { Controller, Get, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/core/guards';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get('me')
  getMe(@Request() req) {
    const userId = req.user.userId;
    return this.userProfileService.getProfile(userId);
  }

  @Patch('update')
  update(@Request() req, @Body() updateDto: UpdateProfileDto) {
    const userId = req.user.userId;
    return this.userProfileService.update(userId, updateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProfileService.getProfile(id);
  }
}