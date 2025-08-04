import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Note } from './notes/note.entity';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    NotesModule,
  ],
})
export class AppModule {}
