import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('authenticated products')
    .setDescription('try authentication process  (get products after login)')
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT authentication in Swagger UI
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT || 3000, async () => {

    console.log(`Application has been started at ${await app.getUrl()}`);
  });

}
bootstrap();