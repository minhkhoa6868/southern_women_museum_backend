import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('api/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check application and database health' })
  @ApiResponse({
    status: 200,
    description: 'System is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        database: { type: 'string', example: 'connected' },
        timestamp: { type: 'string', example: '2024-01-15T10:30:00Z' },
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Service unavailable - database connection failed',
  })
  async checkHealth() {
    return this.healthService.check();
  }
}
