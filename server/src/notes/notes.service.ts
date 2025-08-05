import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { AiService } from '../ai/ai.service';
import { CreateNoteDto, UpdateNoteDto } from './notes.dto';


@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepo: Repository<Note>,
    private aiService: AiService,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.notesRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Note> {
    return this.notesRepo.findOneBy({ id });
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const title = await this.aiService.generateTitle(createNoteDto.content);

    const note = this.notesRepo.create({
      title,
      content: createNoteDto.content,
    });

    return this.notesRepo.save(note);
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    await this.notesRepo.update(id, updateNoteDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.notesRepo.delete(id);
  }
}
