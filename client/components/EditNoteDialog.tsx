import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

type Props = {
  visible: boolean;
  title: string;
  content: string;
  onDismiss: () => void;
  onSave: () => void;
  setTitle: (val: string) => void;
  setContent: (val: string) => void;
};

export default function EditNoteDialog({
  visible,
  title,
  content,
  onDismiss,
  onSave,
  setTitle,
  setContent,
}: Props) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Редактировать заметку</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            value={content}
            onChangeText={setContent}
            placeholder="Content"
            multiline
            style={[styles.input, { height: 100 }]}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onSave}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});
