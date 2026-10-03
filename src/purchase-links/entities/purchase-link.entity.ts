import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Perfume } from '../../perfumes/entities/perfume.entity';

@Entity('purchase_links')
export class PurchaseLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  perfume_id: string;

  @Column({ type: 'varchar', length: 255 })
  platform_name: string;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'boolean', default: true })
  is_available: boolean;

  @ManyToOne(() => Perfume, (perfume) => perfume.purchaseLinks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'perfume_id' })
  perfume: Perfume;
}