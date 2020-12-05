import * as TelegramBot from 'node-telegram-bot-api';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

export const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, {
  polling: process.env.NODE_ENV === 'development',
});

process.env.NODE_ENV === 'development' && console.info('telegram polling has started!');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
