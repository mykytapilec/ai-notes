import React from 'react';
import { Card, IconButton, Text } from 'react-native-paper';
import { Note } from '../types';


type Props = {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
};

export default function NoteCard({ note, onDelete, onEdit }: Props) {
  return (
    <Card style={{ marginBottom: 12 }} onPress={() => onEdit(note)}>
      <Card.Title
        title={note.title}
        subtitle={new Date(note.createdAt).toLocaleString()}
        right={() => (
          <IconButton icon="delete" onPress={() => onDelete(note.id)} />
        )}
      />
      <Card.Content>
        <Text>{note.content}</Text>
      </Card.Content>
    </Card>
  );
}
