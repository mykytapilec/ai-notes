import React, { useEffect, useState, useMemo } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import { Button, Card, Text, IconButton, Dialog, Portal } from 'react-native-paper';
import api from '../services/api';

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');
  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState<'date' | 'title'>('date');
  const [sortAsc, setSortAsc] = useState(false);

  const [editNote, setEditNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Ошибка при получении заметок:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const title = `Note ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}.${pad(now.getMinutes())}`;

    try {
      const response = await api.post('/notes', {
        title,
        content: trimmedInput,
      });
      setNotes(prev => [response.data, ...prev]);
      setInput('');
    } catch (error) {
      console.error('Ошибка при создании заметки:', error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  };

  const openEditDialog = (note: Note) => {
    setEditNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setDialogVisible(true);
  };

  const closeEditDialog = () => {
    setDialogVisible(false);
    setEditNote(null);
  };

  const saveEdit = async () => {
    if (!editNote) return;
    try {
      const updated = await api.put(`/notes/${editNote.id}`, {
        title: editTitle,
        content: editContent,
      });
      setNotes(prev =>
        prev.map(note => (note.id === editNote.id ? updated.data : note)),
      );
      closeEditDialog();
    } catch (error) {
      console.error('Ошибка при сохранении заметки:', error);
    }
  };

  const filteredAndSortedNotes = useMemo(() => {
    let result = notes;

    if (filterText.trim()) {
      const lowerFilter = filterText.toLowerCase();
      result = result.filter(note =>
        note.content.toLowerCase().includes(lowerFilter) ||
        note.title.toLowerCase().includes(lowerFilter) ||
        note.createdAt.includes(lowerFilter)
      );
    }

    result = [...result].sort((a, b) => {
      if (sortKey === 'date') {
        return sortAsc
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return sortAsc
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });

    return result;
  }, [notes, filterText, sortKey, sortAsc]);

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

      <TextInput
        style={styles.input}
        placeholder="Фильтр по тексту или дате"
        value={filterText}
        onChangeText={setFilterText}
      />

      <View style={styles.sortRow}>
        <Button
          mode={sortKey === 'date' ? 'contained' : 'outlined'}
          onPress={() => setSortKey('date')}
          style={styles.sortButton}
        >
          Сортировать по дате
        </Button>
        <Button
          mode={sortKey === 'title' ? 'contained' : 'outlined'}
          onPress={() => setSortKey('title')}
          style={styles.sortButton}
        >
          Сортировать по заголовку
        </Button>
        <Button
          onPress={() => setSortAsc(!sortAsc)}
          style={styles.sortButton}
        >
          {sortAsc ? 'По возрастанию' : 'По убыванию'}
        </Button>
      </View>

      <FlatList
        data={filteredAndSortedNotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => openEditDialog(item)}>
            <Card.Title
              title={item.title}
              subtitle={new Date(item.createdAt).toLocaleString()}
              right={() => (
                <IconButton
                  icon="delete"
                  onPress={() => deleteNote(item.id)}
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
        <Dialog visible={dialogVisible} onDismiss={closeEditDialog}>
          <Dialog.Title>Редактировать заметку</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={[styles.input, { marginBottom: 10 }]}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Заголовок"
            />
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              value={editContent}
              onChangeText={setEditContent}
              placeholder="Содержимое"
              multiline
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeEditDialog}>Отмена</Button>
            <Button onPress={saveEdit}>Сохранить</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, marginBottom: 16, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  button: { marginBottom: 12 },
  card: { marginBottom: 12 },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sortButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});
