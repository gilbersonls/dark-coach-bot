import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/status')
  advice(): { status: string } {
    return { status: 'UP' };
  }
}
