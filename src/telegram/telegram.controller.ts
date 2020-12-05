import { Body, Controller, Post } from '@nestjs/common';
import { bot } from 'src/main';

@Controller('telegram')
export class TelegramController {
  @Post('webhook')
  webhook(@Body() body: any): string {
    bot.processUpdate(body);
    return '';
  }
}
