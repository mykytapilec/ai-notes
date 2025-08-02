import React, { useState } from 'react';
import { TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { generateSummary } from '../services/api';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const result = await generateSummary(text);
      setSummary(result);
    } catch (error) {
      setSummary('Error occurred');
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Введите заметку"
        value={text}
        onChangeText={setText}
      />
      <Button title={loading ? 'Загружаю...' : 'Сгенерировать резюме'} onPress={handleSummarize} disabled={loading} />
      {summary ? <Text style={styles.summary}>{summary}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1 },
  input: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
  summary: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
