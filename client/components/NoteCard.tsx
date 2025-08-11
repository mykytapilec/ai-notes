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
        style={styles.title}
        right={(props) => (
          <div style={styles.btnWrapper}>
            {onEdit && (
              <IconButton {...props} style={styles.icon} icon="pencil" onPress={onEdit} />
            )}
            {onDelete && (
              <IconButton {...props} style={styles.icon} icon="delete" onPress={onDelete} />
            )}
          </div>
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
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
  },
  btnWrapper: {
    display: 'flex',
  },
  icon: {
    margin: 0,
    padding: 0,
    width: 36,
    height: 36,
  },
});
