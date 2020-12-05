import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Rage } from './rage/rage.entity';
import { RageModule } from './rage/rage.module';
import { TelegramModule } from './telegram/telegram.module';
import { TwitterModule } from './twitter/twitter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    CacheModule.register(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Rage],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    TwitterModule,
    TelegramModule,
    RageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
