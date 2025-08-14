import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { hostname, PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors({
    origin: '*',
  });

  const port = config.get<number>(PORT) || 3000;
  await app.listen(port, hostname);
  console.log(`🚀 Server started on http://localhost:${port}`);
}
bootstrap();
