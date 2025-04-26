import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@/app.module';
import { PORT } from '@/constant';
import { setupSwagger } from '@/shared/swagger/setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = PORT;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  setupSwagger(app);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  console.log(`Server is Running on Port ${port}`);

  await app.listen(port);
}

bootstrap();
