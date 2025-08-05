export class CreateNoteDto {
  readonly content: string;
}

export class UpdateNoteDto {
  readonly content?: string;
  readonly title?: string;
}
