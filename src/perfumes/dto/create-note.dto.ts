import { IsString, IsEnum, IsInt, Min, Max, IsUUID } from 'class-validator';
import { NoteType } from '../../notes/entities/note.entity';

export class CreateNoteDto {
  @IsUUID()
  perfume_id: string;

  @IsEnum(NoteType)
  note_type: NoteType;

  @IsString()
  ingredient_name: string;

  @IsInt()
  @Min(0)
  @Max(100)
  percentage: number;
}