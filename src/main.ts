import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable CORS for all origins (you can customize this for production)
  app.enableCors();

  // Setup validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Southern Women Museum API')
    .setDescription(
      'Southern Women Museum API with Database Integration, Authentication, and Comprehensive Documentation',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .addTag('health', 'Health check endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = Number(process.env.APP_PORT ?? process.env.PORT ?? 3000);
  await app.listen(Number.isNaN(port) ? 3000 : port);

  console.log(
    `Application running on http://localhost:${Number.isNaN(port) ? 3000 : port}`,
  );
  console.log(
    `Swagger documentation available at http://localhost:${Number.isNaN(port) ? 3000 : port}/api/docs`,
  );
}
void bootstrap();
