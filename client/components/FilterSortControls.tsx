import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  filterText: string;
  onChangeFilter: (val: string) => void;
  sortKey: 'date' | 'title';
  sortAsc: boolean;
  onChangeSortKey: (key: 'date' | 'title') => void;
  onToggleSortOrder: () => void;
};

export default function FilterSortControls({
  filterText,
  onChangeFilter,
  sortKey,
  sortAsc,
  onChangeSortKey,
  onToggleSortOrder,
}: Props) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Filter notes..."
        value={filterText}
        onChangeText={onChangeFilter}
      />

      <View style={styles.sortRow}>
        <Button
          mode={sortKey === 'date' ? 'contained' : 'outlined'}
          onPress={() => onChangeSortKey('date')}
          style={styles.sortButton}
        >
          By date
        </Button>
        <Button
          mode={sortKey === 'title' ? 'contained' : 'outlined'}
          onPress={() => onChangeSortKey('title')}
          style={styles.sortButton}
        >
          By title
        </Button>
        <Button onPress={onToggleSortOrder} style={styles.sortButton}>
          {sortAsc ? '▲' : '▼'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginVertical: 6 },
  sortRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sortButton: { flex: 1, marginHorizontal: 4 },
});
