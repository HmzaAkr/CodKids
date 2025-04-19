import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cod Kids')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addTag('Cod Kids')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // mount at /docs

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();


  await app.listen(3000);
}
 bootstrap();
