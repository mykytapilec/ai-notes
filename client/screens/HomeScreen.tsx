import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import api from '../services/api';
import NoteCard from '../components/NoteCard';
import EditNoteDialog from '../components/EditNoteDialog';
import FilterSortControls from '../components/FilterSortControls';

type Note = {
  id: string;
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState<'date' | 'title'>('date');
  const [sortAsc, setSortAsc] = useState(true);

  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const createNote = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const response = await api.post('/notes', { content: input });
      setNotes([response.data, ...notes]);
      setInput('');
    } catch (error) {
      console.error('Error creating note:', error);
      Alert.alert('Error', 'Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const openEditDialog = (note: Note) => {
    setEditingNote(note);
    setEditTitle(note.title || '');
    setEditContent(note.content || '');
    setEditDialogVisible(true);
  };

  const editNote = async () => {
    if (!editingNote) return;

    try {
      const response = await api.put(`/notes/${editingNote.id}`, {
        title: editTitle,
        content: editContent,
      });

      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNote.id ? response.data : note
        )
      );
    } catch (error) {
      console.error('Error editing note:', error);
      Alert.alert('Error', 'Failed to update note');
    } finally {
      setEditDialogVisible(false);
    }
  };

  const filteredSortedNotes = notes
    .filter((note) =>
      [note.title, note.content].some((field) =>
        field?.toLowerCase().includes(filterText.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aVal = sortKey === 'title' ? a.title : a.createdAt;
      const bVal = sortKey === 'title' ? b.title : b.createdAt;
      return sortAsc
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter an idea..."
        value={input}
        onChangeText={setInput}
      />
      <Button
        mode="contained"
        onPress={createNote}
        loading={loading}
        textColor="#fff"
        style={styles.button}
        disabled={!input.trim()}
      >
        Create Note
      </Button>

      <FilterSortControls
        filterText={filterText}
        onChangeFilter={setFilterText}
        sortKey={sortKey}
        sortAsc={sortAsc}
        onChangeSortKey={setSortKey}
        onToggleSortOrder={() => setSortAsc((prev) => !prev)}
      />

      <FlatList
        data={filteredSortedNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            title={item.title}
            content={item.content}
            onDelete={() => deleteNote(item.id)}
            onEdit={() => openEditDialog(item)}
          />
        )}
      />

      <EditNoteDialog
        visible={editDialogVisible}
        title={editTitle}
        content={editContent}
        onDismiss={() => setEditDialogVisible(false)}
        onSave={editNote}
        setTitle={setEditTitle}
        setContent={setEditContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, marginBottom: 16, fontWeight: 'bold' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8,
  },
  button: { marginTop: 10, marginBottom: 20, backgroundColor: "#1e88e5" },
});
