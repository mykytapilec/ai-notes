import React from 'react';
import { Card, IconButton, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type Props = {
  title: string;
  content: string;
  onDelete?: () => void;
  onEdit?: () => void;
};

export default function NoteCard({ title, content, onDelete, onEdit }: Props) {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={title}
        right={(props) => (
          <>
            {onEdit && (
              <IconButton {...props} icon="pencil" onPress={onEdit} />
            )}
            {onDelete && (
              <IconButton {...props} icon="delete" onPress={onDelete} />
            )}
          </>
        )}
      />
      <Card.Content>
        <Text>{content}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
});
