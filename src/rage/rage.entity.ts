import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rage {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint' })
  chat_id: number;

  @Column()
  user: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp', default: new Date() })
  updated_at: Date;

  @Column()
  quantity: number;
}
