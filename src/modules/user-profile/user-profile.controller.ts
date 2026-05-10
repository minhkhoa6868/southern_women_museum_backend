import { Controller, Get, Body, Patch, Param, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/core/guards';

interface AuthRequest {
  user: { userId: string; email: string; isAdmin: boolean };
}

@Controller('api/profile')
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get('me')
  getMe(@Request() req: AuthRequest) {
    return this.userProfileService.getProfile(req.user.userId);
  }

  @Patch('update')
  update(@Request() req: AuthRequest, @Body() updateDto: UpdateProfileDto) {
    return this.userProfileService.update(req.user.userId, updateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthRequest) {
    if (req.user.userId !== id && !req.user.isAdmin) {
      throw new ForbiddenException('Access denied');
    }
    return this.userProfileService.getProfile(id);
  }
}
