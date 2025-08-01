import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import NoteCard from '../components/NoteCard';
import { submitNote } from '../services/api';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [aiText, setAiText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await submitNote(text);
      setAiText(res.aiText);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <TextInput
        label="Введите заметку"
        value={text}
        multiline
        onChangeText={setText}
        style={{ marginBottom: 10 }}
      />
      <Button mode="contained" onPress={handleSubmit} loading={loading}>
        Отправить в AI
      </Button>
      {aiText !== '' && <NoteCard original={text} ai={aiText} />}
    </ScrollView>
  );
}
