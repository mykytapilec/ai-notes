import { useState, useEffect } from 'react';
import api from '../services/api';
import { Note } from '../types';

export default function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const res = await api.get('/notes');
    setNotes(res.data);
  };

  const createNote = async (content: string) => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const title = `Note ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}.${pad(now.getMinutes())}`;
    const res = await api.post('/notes', { title, content });
    setNotes(prev => [res.data, ...prev]);
  };

  const deleteNote = async (id: number) => {
    await api.delete(`/notes/${id}`);
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const updateNote = async (id: number, data: Partial<Note>) => {
    const res = await api.put(`/notes/${id}`, data);
    setNotes(prev => prev.map(n => (n.id === id ? res.data : n)));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, createNote, deleteNote, updateNote, fetchNotes };
}
