import axios from 'axios';

const API_URL = 'http://<YOUR_LOCAL_IP>:3000'; // заменим позже

export const submitNote = async (text: string) => {
  const res = await axios.post(`${API_URL}/notes`, {
    originalText: text,
  });
  return res.data;
};