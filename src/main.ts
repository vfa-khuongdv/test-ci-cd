/**
 * main.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/17/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Express from 'express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@/shared/pipes/validation.pipe';

async function bootstrap() {
  // aws health check
  const server = Express();
  server.get('/', (req, res) => res.send('server ok'));
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle(`${process.env.APP_NAME} API Document`)
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options, {});

  if (process.env.STAGE !== 'prod') {
    SwaggerModule.setup('swagger', app, document);
  }

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.APP_PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    new Logger('Application').log(
      `Service started successfully at port ${port}`,
    );
  });
}

(async () => {
  await bootstrap();
})();
