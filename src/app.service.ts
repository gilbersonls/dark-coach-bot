import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
import { DARKCOACH_BIO, DARKCOACH_BOT } from './app.constants';
import { TelegramOnMessagePayload } from './telegram/types';

import { TwitterService } from './twitter/twitter.service';
import { SearchResult, Tweet } from './twitter/types';

@Injectable()
export class AppService {
  private screen_name = 'chris_profanus';

  constructor(
    private readonly twitterService: TwitterService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getRandomTweet(): Promise<Tweet> {
    let tweets = await this.cacheManager.get<SearchResult>('tweets');

    if (!tweets) {
      tweets = await this.cacheManager.set<SearchResult>(
        'tweets',
        await this.twitterService.search(`(from:${this.screen_name}) -filter:replies`, {
          count: 100,
        }),
        { ttl: 43200 },
      );
    }

    return tweets.statuses[Math.floor(Math.random() * tweets.statuses.length)];
  }

  @OnEvent('telegram.command.start')
  async telegramMessageStart({ bot, message }: TelegramOnMessagePayload) {
    bot.sendMessage(
      message.chat.id,
      `Olá, ${message.from.first_name}, se quiser um pensamento do seu DarkCoach preferido digite: /pensamento! \n\n${DARKCOACH_BIO}`,
    );
  }

  @OnEvent('telegram.command.pensamento')
  async telegramMessageThought({ bot, message }: TelegramOnMessagePayload) {
    bot.sendMessage(
      message.chat.id,
      `"${(await this.getRandomTweet()).full_text}" - ${DARKCOACH_BOT}`,
    );
  }
}
