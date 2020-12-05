import { bot } from 'src/main';
import { TwitterModule } from 'src/twitter/twitter.module';

import { Module, OnModuleInit } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

import { TelegramController } from './telegram.controller';

@Module({
  imports: [TwitterModule, EventEmitterModule.forRoot()],
  controllers: [TelegramController],
})
export class TelegramModule implements OnModuleInit {
  constructor(private eventEmitter: EventEmitter2) {}

  onModuleInit() {
    bot.onText(/\/([a-z0-9-]+)/, (message, match) => {
      this.eventEmitter.emit(`telegram.command.${match[1]}`, { message, bot });
    });
  }
}
