import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepo: Repository<Note>,
  ) {}

  private notes = [
    { id: 1, title: 'Первая заметка', content: 'Текст заметки 1' },
    { id: 2, title: 'Вторая заметка', content: 'Текст заметки 2' },
  ];

  findAll() {
    return this.notesRepo.find();
  }

  findOne(id: number) {
    return this.notesRepo.findOneBy({ id });
  }

  create(noteData: Partial<Note>) {
    const note = this.notesRepo.create(noteData);
    return this.notesRepo.save(note);
  }

  async update(id: number, updateData: Partial<Note>) {
    await this.notesRepo.update(id, updateData);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.notesRepo.delete(id);
  }
}
