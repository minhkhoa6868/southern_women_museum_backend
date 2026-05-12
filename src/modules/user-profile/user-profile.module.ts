import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/entity/user.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
