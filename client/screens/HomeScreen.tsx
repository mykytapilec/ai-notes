import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import { Button, Card, Text, IconButton, Portal, Dialog, Paragraph } from 'react-native-paper';
import api from '../services/api';

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Ошибка при получении заметок:', error);
    }
  };

  const createNote = async () => {
    if (!input.trim()) return;

    const now = new Date();
    const formattedTitle = `Note ${now.toLocaleDateString('en-GB')} ${now.getHours()}.${now.getMinutes()}`;

    try {
      const response = await api.post('/notes', {
        title: formattedTitle,
        content: input,
      });
      setNotes([response.data, ...notes]);
      setInput('');
    } catch (error) {
      console.error('Ошибка при создании заметки:', error);
    }
  };

  const confirmDelete = (id: number) => {
    setSelectedNoteId(id);
    setDialogVisible(true);
  };

  const handleDelete = async () => {
    if (selectedNoteId === null) return;

    try {
      await api.delete(`/notes/${selectedNoteId}`);
      setNotes(notes.filter((note) => note.id !== selectedNoteId));
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    } finally {
      setDialogVisible(false);
      setSelectedNoteId(null);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Notes</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите идею..."
        value={input}
        onChangeText={setInput}
      />
      <Button mode="contained" onPress={createNote} style={styles.button}>
        Создать заметку
      </Button>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.title}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="delete"
                  onPress={() => confirmDelete(item.id)}
                />
              )}
            />
            <Card.Content>
              <Text>{item.content}</Text>
            </Card.Content>
          </Card>
        )}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Удалить заметку</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Вы уверены, что хотите удалить эту заметку?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Отмена</Button>
            <Button onPress={handleDelete}>Удалить</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, marginBottom: 16, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
  button: { marginTop: 10, marginBottom: 20 },
  card: { marginBottom: 12 },
});
