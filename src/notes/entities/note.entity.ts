import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Perfume } from '../../perfumes/entities/perfume.entity';

export enum NoteType {
  TOP = 'top',
  MIDDLE = 'middle',
  BASE = 'base',
}

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  perfume_id: string;

  @Column({
    type: 'enum',
    enum: NoteType,
  })
  note_type: NoteType;

  @Column({ type: 'varchar', length: 255 })
  ingredient_name: string;

  @Column({ type: 'int', default: 0 })
  percentage: number; // 0-100

  @ManyToOne(() => Perfume, (perfume) => perfume.notes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'perfume_id' })
  perfume: Perfume;
}