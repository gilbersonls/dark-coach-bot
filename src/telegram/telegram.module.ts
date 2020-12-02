import * as TelegramBot from 'node-telegram-bot-api';
import { TwitterModule } from 'src/twitter/twitter.module';

import { Module, OnModuleInit } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [TwitterModule, EventEmitterModule.forRoot()],
})
export class TelegramModule implements OnModuleInit {
  constructor(private eventEmitter: EventEmitter2) {}

  onModuleInit() {
    const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, {
      polling: true,
    });

    console.info('polling has started!');

    bot.on('message', (message: TelegramBot.Message) => {
      this.eventEmitter.emit('telegram.message', { message, bot });
    });
  }
}
