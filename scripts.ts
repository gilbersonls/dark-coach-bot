import * as dotenv from 'dotenv';
import * as TelegramBot from 'node-telegram-bot-api';

dotenv.config();

async function registerWebHook() {
  const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN);
  bot.setWebHook(`${process.env.PUBLIC_URL}/telegram/webhook`);
}

async function bootstrap() {
  for (const fn of process.argv.filter(argv => argv.match(/--[a-z0-9-]/))) {
    switch (fn) {
      case '--register-web-hook':
        return await registerWebHook();
    }
  }
}

bootstrap();
