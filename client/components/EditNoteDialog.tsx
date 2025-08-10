import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, TextInput as PaperInput } from 'react-native-paper';

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
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={styles.dialog}
      >
        <Dialog.Title style={styles.dialogTitle}>Edit note</Dialog.Title>
        <Dialog.Content>
          <PaperInput
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            placeholder="Заголовок"
            placeholderTextColor="#aaa"
            theme={{
              colors: {
                text: '#fff',
                placeholder: '#aaa',
                primary: '#fff',
                background: '#1e1e1e',
              },
            }}
            style={styles.input}
          />
          <PaperInput
            mode="outlined"
            value={content}
            onChangeText={setContent}
            placeholder="Content"
            placeholderTextColor="#aaa"
            multiline
            theme={{
              colors: {
                text: '#fff',
                placeholder: '#aaa',
                primary: '#fff',
                background: '#1e1e1e',
              },
            }}
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} textColor="#ccc">
            Cancel
          </Button>
          <Button onPress={onSave} textColor="#fff">
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: '#1e1e1e',
  },
  dialogTitle: {
    color: '#fff',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
  },
});
