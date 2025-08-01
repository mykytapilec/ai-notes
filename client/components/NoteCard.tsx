import React from 'react';
import { Card, Text } from 'react-native-paper';

type Props = {
  original: string;
  ai: string;
};

export default function NoteCard({ original, ai }: Props) {
  return (
    <Card style={{ marginVertical: 10 }}>
      <Card.Title title="Исходный текст" />
      <Card.Content>
        <Text>{original}</Text>
      </Card.Content>
      <Card.Title title="AI версия" />
      <Card.Content>
        <Text>{ai}</Text>
      </Card.Content>
    </Card>
  );
}
