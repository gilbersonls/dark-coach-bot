import { Injectable } from '@nestjs/common';

import { TwitterService } from './twitter/twitter.service';
import { User } from './twitter/types';

@Injectable()
export class AppService {
  private screen_name = 'chris_profanus';
  private user: User;

  constructor(private readonly twitterService: TwitterService) {}

  async getRandomTweet() {
    const tweets = await this.twitterService.search(`(from:${this.screen_name}) -filter:replies`, {
      count: 100,
    });
    return tweets.statuses[Math.floor(Math.random() * tweets.statuses.length)];
  }

  async getDarkCoachThought() {
    const randomTweet = await this.getRandomTweet();
    return `"${randomTweet.full_text}" - @${randomTweet.user.screen_name}`;
  }

  async getDarkCoachBio() {
    const user = this.user ? this.user : (await this.getRandomTweet()).user;
    return `@${user.screen_name}\n${user.description}`;
  }
}
