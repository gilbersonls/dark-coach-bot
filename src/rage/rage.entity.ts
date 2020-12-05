import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Rage {
  @PrimaryColumn()
  id: number;

  @Column()
  chat_id: number;

  @Column({ unique: true })
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
