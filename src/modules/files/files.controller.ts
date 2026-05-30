import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiBadRequestResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('api/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('presign')
  @ApiOperation({ summary: 'Get presigned URL for S3 object key' })
  @ApiQuery({
    name: 'key',
    required: true,
    description: 'S3 object key (filename or path)',
  })
  @ApiQuery({
    name: 'expires',
    required: false,
    description: 'Expiry seconds (default 3600)',
  })
  @ApiOkResponse({ description: 'Presigned URL returned' })
  @ApiBadRequestResponse({ description: 'Missing key or misconfigured server' })
  async presign(@Query('key') key: string, @Query('expires') expires?: string) {
    if (!key) {
      return { message: 'Missing key query parameter' };
    }

    const expiresIn = expires ? Number(expires) : 3600;
    const url = await this.filesService.getPresignedUrl(key, expiresIn);
    return { url, expiresIn };
  }
}
