import { bot } from 'src/main';

import { Module, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { TelegramController } from './telegram.controller';

@Module({
  imports: [],
  controllers: [TelegramController],
})
export class TelegramModule implements OnModuleInit {
  constructor(private eventEmitter: EventEmitter2) {}

  onModuleInit() {
    bot.onText(/\/?#?([a-z0-9-]+)/, (message, match) => {
      this.eventEmitter.emit(`telegram.command.${match[1]}`, { message, bot });
    });

    bot.onText(
      /.?(?:l+i+x+o+|r+a+g+e+|(o|ó)+d+(e+)?i+o+|m+e+r+d+a+|z+u+a+d+o+)[a-z0-9\s]?/gim,
      (message, match) => {
        !match.input.startsWith('/') &&
          this.eventEmitter.emit(`telegram.message.${match[1]}`, { message, bot });
      },
    );
  }
}
