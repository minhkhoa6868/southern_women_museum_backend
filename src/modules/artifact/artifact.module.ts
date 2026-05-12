import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtifactController } from './artifact.controller';
import { ArtifactService } from './artifact.service';
import { ArtifactEntity } from './entity/artifact.entity';
import { RoomEntity } from '../room/entity/room.entity';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtifactEntity, RoomEntity]),
    AuthModule,
    FilesModule,
  ],
  controllers: [ArtifactController],
  providers: [ArtifactService],
  exports: [ArtifactService],
})
export class ArtifactModule {}
