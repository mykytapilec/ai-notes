import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import api from '../services/api';

type Note = {
  _id: string;
  text: string;
};

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');

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

    try {
      const response = await api.post('/notes', { prompt: input });
      setNotes([response.data, ...notes]);
      setInput('');
    } catch (error) {
      console.error('Ошибка при создании заметки:', error);
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
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>{item.text}</Text>
            </Card.Content>
          </Card>
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
  card: { marginBottom: 12 },
});
