import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix("api");

  app.enableCors();

  app.useStaticAssets(
    join(__dirname, "..", "uploads/avatars"), 
    { prefix: "/avatars" }
  );

  app.useStaticAssets(
    join(__dirname, "..", "uploads/covers"), 
    { prefix: "/covers" }
  );

  app.useStaticAssets(
    join(__dirname, "..", "uploads/articles"), 
    { prefix: "/articles" }
  );

  await app.listen(configService.get<number>("PORT") || 3000);
}
bootstrap();
