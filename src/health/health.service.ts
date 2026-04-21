import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private readonly dataSource: DataSource) {}

  async check() {
    const isConnected = this.dataSource.isInitialized;

    if (!isConnected) {
      return {
        status: 'error',
        database: 'disconnected',
        timestamp: new Date(),
      };
    }

    try {
      await this.dataSource.query('SELECT 1');
      return {
        status: 'ok',
        database: 'connected',
        timestamp: new Date(),
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return {
        status: 'error',
        database: 'connection failed',
        error: errorMessage,
        timestamp: new Date(),
      };
    }
  }
}
