import * as dotenv from 'dotenv';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Rage } from './rage/rage.entity';

dotenv.config();

export const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Rage],
  synchronize: process.env.NODE_ENV === 'development',
  migrations: ['src/migrations/*{.ts,.js}'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default ormconfig;
