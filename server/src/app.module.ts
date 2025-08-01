import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NotesService } from './notes/notes.service';
import { NotesController } from './notes/notes.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mikitapilets',
      password: 'Karlson242424!',
      database: 'ai-notes',
      entities: [Note],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Note]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}
