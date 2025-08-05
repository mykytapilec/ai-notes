import React from 'react';
import { Card, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type Props = {
  text: string;
  onDelete?: () => void;
  onEdit?: () => void;
};

export default function NoteCard({ text, onDelete, onEdit }: Props) {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={text}
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
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
});
