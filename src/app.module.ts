import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule, OnEvent } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { TelegramOnMessagePayload } from './telegram/types';
import { TwitterModule } from './twitter/twitter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    TwitterModule,
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly service: AppService) {}

  @OnEvent('telegram.message')
  async handleTelegramMessages(payload: TelegramOnMessagePayload) {
    const { bot, message } = payload;

    switch (message.text) {
      case '/pensamento':
        return bot.sendMessage(message.chat.id, await this.service.getDarkCoachThought());

      case '/start':
        return bot.sendMessage(
          message.chat.id,
          `Olá, ${
            message.from.username
          }, se quiser um pensamento do seu DarkCoach preferido digite: /pensamento! \n\n${await this.service.getDarkCoachBio()} `,
        );
    }

    if (message.text.startsWith('/')) bot.sendMessage(message.chat.id, 'comando desconhecido');
  }
}
