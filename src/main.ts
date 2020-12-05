import * as TelegramBot from 'node-telegram-bot-api';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

export const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, {
  polling: DEVELOPMENT,
});

async function bootstrap() {
  if (DEVELOPMENT) console.info('telegram polling has started!');
  else await bot.setWebHook(`${process.env.PUBLIC_URL}/telegram/webhook`);

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
