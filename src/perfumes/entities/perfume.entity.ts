import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Note } from '../../notes/entities/note.entity';
import { PurchaseLink } from '../../purchase-links/entities/purchase-link.entity';

@Entity('perfumes')
export class Perfume {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image_url: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  longevity: number;

  @Column({ type: 'int', nullable: true })
  sillage: number;

  @OneToMany(() => Note, (note) => note.perfume, { cascade: true })
  notes: Note[];

  @OneToMany(() => PurchaseLink, (link) => link.perfume, { cascade: true })
  purchaseLinks: PurchaseLink[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}