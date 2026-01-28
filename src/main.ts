/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ เปิด CORS ทั้งหมด (ทุก domain, ทุก method, ทุก header)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://192.168.20.74:3000',
      'https://ppcd.edl.com.la',
    ],
    credentials: true,
  });

  // ตั้งค่า Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('API') // สามารถลบหรือแก้ไขได้ตามหมวด
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.setGlobalPrefix('api');
  // ✅ STATIC FILES (รองรับ Windows / Linux)
  const uploadBasePath = process.env.UPLOAD_BASE_PATH;
  if (!uploadBasePath) {
    throw new Error('UPLOAD_BASE_PATH is not defined');
  }

  app.use('/upload', express.static(path.resolve(uploadBasePath)));

  await app.listen(4000);
}
bootstrap();
