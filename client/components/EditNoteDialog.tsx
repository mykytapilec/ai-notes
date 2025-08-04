import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

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
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Заголовок"
          />
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            value={content}
            onChangeText={setContent}
            placeholder="Содержимое"
            multiline
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Отмена</Button>
          <Button onPress={onSave}>Сохранить</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10,
  },
});
