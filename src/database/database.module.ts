import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        if (!databaseUrl) {
          throw new Error('DATABASE_URL is not set');
        }

        return {
          type: 'postgres' as const,
          url: databaseUrl,
          autoLoadEntities: true,
          synchronize: false,
          keepConnectionAlive: true,
          retryAttempts: 1,
          retryDelay: 1000,
          ssl: {
            rejectUnauthorized: false,
          },
          extra: {
            connectionTimeoutMillis: 5000,
            idleTimeoutMillis: 5000,
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
