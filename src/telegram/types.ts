import * as TelegramBot from 'node-telegram-bot-api';

export type TelegramOnMessagePayload = { bot: TelegramBot; message: TelegramBot.Message };
