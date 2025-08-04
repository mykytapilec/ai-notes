import React, { useMemo, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import useNotes from '../hooks/useNotes';
import NoteCard from '../components/NoteCard';
import EditNoteDialog from '../components/EditNoteDialog';
import FilterSortControls from '../components/FilterSortControls';

export default function HomeScreen() {
  const { notes, createNote, deleteNote, updateNote } = useNotes();
  const [input, setInput] = useState('');
  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState<'date' | 'title'>('date');
  const [sortAsc, setSortAsc] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [editNoteId, setEditNoteId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const filteredNotes = useMemo(() => {
    let list = notes;
    if (filterText.trim()) {
      const t = filterText.toLowerCase();
      list = list.filter(n =>
        n.title.toLowerCase().includes(t) ||
        n.content.toLowerCase().includes(t) ||
        n.createdAt.toLowerCase().includes(t),
      );
    }

    return list.sort((a, b) => {
      if (sortKey === 'date') {
        return sortAsc
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return sortAsc
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
  }, [notes, filterText, sortKey, sortAsc]);

  const handleCreate = () => {
    if (!input.trim()) return;
    createNote(input.trim());
    setInput('');
  };

  const handleEdit = (note: any) => {
    setEditNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setDialogVisible(true);
  };

  const saveEdit = () => {
    if (!editNoteId) return;
    updateNote(editNoteId, { title: editTitle, content: editContent });
    setDialogVisible(false);
    setEditNoteId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите идею..."
        value={input}
        onChangeText={setInput}
      />
      <Button mode="contained" onPress={handleCreate} style={styles.button}>
        Создать заметку
      </Button>

      <FilterSortControls
        filterText={filterText}
        onChangeFilter={setFilterText}
        sortKey={sortKey}
        sortAsc={sortAsc}
        onChangeSortKey={setSortKey}
        onToggleSortOrder={() => setSortAsc(!sortAsc)}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onDelete={deleteNote}
            onEdit={handleEdit}
          />
        )}
      />

      <EditNoteDialog
        visible={dialogVisible}
        title={editTitle}
        content={editContent}
        onDismiss={() => setDialogVisible(false)}
        onSave={saveEdit}
        setTitle={setEditTitle}
        setContent={setEditContent}
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
