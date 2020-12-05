import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
import { DARKCOACH_BIO, DARKCOACH_BOT } from './app.constants';
import { RageService } from './rage/rage.service';
import { TelegramOnMessagePayload } from './telegram/types';

import { TwitterService } from './twitter/twitter.service';
import { SearchResult, Tweet } from './twitter/types';

import * as markdownTable from 'markdown-table';
import { differenceInDays, format } from 'date-fns';

@Injectable()
export class AppService {
  private screen_name = 'chris_profanus';

  constructor(
    private readonly twitterService: TwitterService,
    private readonly rageService: RageService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getRandomTweet(): Promise<Tweet> {
    const tweets =
      (await this.cacheManager.get<SearchResult>('tweets')) ||
      (await this.cacheManager.set<SearchResult>(
        'tweets',
        await this.twitterService.search(`(from:${this.screen_name}) -filter:replies`, {
          count: 100,
        }),
        { ttl: 43200 },
      ));

    return tweets.statuses[Math.floor(Math.random() * tweets.statuses.length)];
  }

  @OnEvent('telegram.command.start')
  async telegramCommandStart({ bot, message }: TelegramOnMessagePayload) {
    bot.sendMessage(
      message.chat.id,
      `Olá, ${message.from.first_name}, se quiser um pensamento do seu DarkCoach preferido digite: /pensamento! \n\n${DARKCOACH_BIO}`,
    );
  }

  @OnEvent('telegram.command.pensamento')
  async telegramCommandThought({ bot, message }: TelegramOnMessagePayload) {
    bot.sendMessage(
      message.chat.id,
      `"${(await this.getRandomTweet()).full_text}" - ${DARKCOACH_BOT}`,
    );
  }

  @OnEvent('telegram.command.rage')
  async telegramCommandRage({ bot, message }: TelegramOnMessagePayload) {
    const rage = (await this.rageService.findOne(message.chat.id, message.from.id)) || {
      user_id: message.from.id,
      chat_id: message.chat.id || message.from.id,
      user: message.from.username,
      first_name: message.from.first_name,
      created_at: new Date(),
      quantity: 0,
    };

    await this.rageService.save({
      ...rage,
      updated_at: new Date(),
      quantity: rage.quantity + 1,
    });

    bot.sendMessage(
      message.chat.id,
      `RAGEEEEEEEEEEE!!!!!!!\n+1 pro ${message.from.first_name}\n/rageinfo`,
    );
  }

  @OnEvent('telegram.command.rageinfo')
  async telegramCommandRageinfo({ bot, message }: TelegramOnMessagePayload) {
    const rages = await this.rageService.findAllOrderByUpdatedAt(message.chat.id);

    if (rages.length >= 1) {
      const result = markdownTable([
        ['Quem?', 'TOP #RAGE'],
        ...rages
          .sort((a, b) => (a.quantity > b.quantity ? 1 : -1))
          .map(({ first_name, quantity }) => [first_name, quantity.toString()]),
      ]);

      bot.sendMessage(message.chat.id, `<pre>${result}</pre>`, { parse_mode: 'HTML' });
    }

    bot.sendMessage(
      message.chat.id,
      `Estamos há ${
        rages.length >= 1 ? differenceInDays(rages[0].updated_at, new Date()) : 'muitos'
      } dias sem rage.`,
    );
  }
}
