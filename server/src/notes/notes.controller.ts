import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from '../note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Post()
  create(@Body() noteData: Partial<Note>) {
    return this.notesService.create(noteData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Note>) {
    return this.notesService.update(+id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesService.delete(+id);
  }
}
