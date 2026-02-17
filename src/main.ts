/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';
import { rateLimit } from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Rate Limit: 100 request ต่อ 1 นาที ต่อ IP
  const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 นาที
    max: 100, // 100 request ต่อ window
    standardHeaders: true,
    legacyHeaders: false,
    message: new Error(
      'Too many requests from this IP, please try again after a minute',
    ),
  });
  app.use(limiter);

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
