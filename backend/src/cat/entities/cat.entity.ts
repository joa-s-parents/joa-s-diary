import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat')
export class CatEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'owner_id' })
  ownerId: string;

  @Column()
  name: string;

  @Column()
  sex: number;

  @Column({ name: 'birthed_at' })
  birthedAt: Date;

  @Column({ name: 'deleted_at' })
  deletedAt?: Date;
}
