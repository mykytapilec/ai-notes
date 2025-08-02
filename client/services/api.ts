import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const generateSummary = async (text: string): Promise<string> => {
  const response = await api.post('/notes/summary', { text });
  return response.data.summary;
};