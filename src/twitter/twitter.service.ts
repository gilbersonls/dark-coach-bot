import * as Twitter from 'twitter';

import { Injectable } from '@nestjs/common';

import { SearchResult } from './types';

@Injectable()
export class TwitterService {
  private client: Twitter;

  constructor() {
    this.client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      bearer_token: process.env.TWITTER_BEARER_TOKEN,
    });
  }

  private get(path: string, params: Twitter.RequestParams): Promise<any> {
    return new Promise((resolve, reject) =>
      this.client.get(path, params, (error, data) =>
        error ? reject(error) : resolve(data),
      ),
    );
  }

  search(query: string, params: Twitter.RequestParams): Promise<SearchResult> {
    return this.get('search/tweets', {
      q: query,
      tweet_mode: 'extended',
      ...params,
    });
  }
}
