import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../notes/entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  // 특정 향수의 노트 조회
  async findByPerfumeId(perfumeId: string) {
    return await this.noteRepository.find({
      where: { perfume_id: perfumeId },
      order: {
        note_type: 'ASC',
      },
    });
  }

  // 노트 생성
  async create(createNoteDto: CreateNoteDto) {
    const note = this.noteRepository.create(createNoteDto);
    return await this.noteRepository.save(note);
  }

  // 여러 노트 한번에 생성
  async createMany(createNoteDtos: CreateNoteDto[]) {
    const notes = this.noteRepository.create(createNoteDtos);
    return await this.noteRepository.save(notes);
  }
}