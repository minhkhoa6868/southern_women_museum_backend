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
          // Supabase requires rejectUnauthorized: false for its managed TLS certificates
          ssl: {
            rejectUnauthorized: false,
          },
          extra: {
            connectionTimeoutMillis: 30000,
            idleTimeoutMillis: 600000,
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
