import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rage } from './rage.entity';

@Injectable()
export class RageService {
  constructor(
    @InjectRepository(Rage)
    private rageRepository: Repository<Rage>,
  ) {}

  findOne(chat_id: number, id: number): Promise<Rage> {
    return this.rageRepository.findOne({ chat_id, id });
  }

  findAllOrderByUpdatedAt(chat_id: number): Promise<Rage[]> {
    return this.rageRepository
      .createQueryBuilder()
      .where(`chat_id = ${chat_id}`)
      .orderBy('updated_at', 'DESC')
      .getMany();
  }

  findAll(): Promise<Rage[]> {
    return this.rageRepository.find();
  }

  async save(rage: Rage): Promise<void> {
    await this.rageRepository.save(rage);
  }
}
