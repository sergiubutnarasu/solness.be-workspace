import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppConfigKey, AppHelper, GraphQLFilter } from '@solness/core';
import { SolnessModule } from './solness.module';

async function bootstrap() {
  const app = await NestFactory.create(SolnessModule);

  app.useGlobalFilters(new GraphQLFilter());
  app.enableCors({
    credentials: true,
    origin: AppHelper.getConfig(AppConfigKey.DefaultLink),
  });

  const port = AppHelper.getConfig(AppConfigKey.Port);
  await app.listen(port ?? 5089);
}
bootstrap();
