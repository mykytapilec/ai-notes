import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import api from '../services/api';
import NoteCard from '../components/NoteCard';

type Note = {
  _id: string;
  text: string;
};

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
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
        placeholder="Enter an idea..."
        value={input}
        onChangeText={setInput}
      />
      <Button
        mode="contained"
        onPress={createNote}
        loading={loading}
        style={styles.button}
        disabled={!input.trim()}
      >
        Create Note
      </Button>
      <FlatList
        data={notes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <NoteCard
            text={item.text}
            onDelete={() => deleteNote(item._id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, marginBottom: 16, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
  button: { marginTop: 10, marginBottom: 20 },
});
