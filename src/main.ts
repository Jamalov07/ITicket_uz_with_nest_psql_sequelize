import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AllExceptionsFilter } from './errors/all-exceptions.filter';
import * as cookieParser from 'cookie-parser';
const start = async () => {
  try {
    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);
    // const adapterHost = app.get(HttpAdapterHost);
    // app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
    .setTitle('ITicket_uz')
    .setDescription('REST API')
    .setVersion('1.0.0')
    .addTag('NodeJS, NestJS, Postgres, Sequelize')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server ${PORT}  portida ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
