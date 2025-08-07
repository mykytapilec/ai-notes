import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

let baseURL = 'http://localhost:3000';

if (Platform.OS !== 'web') {
  const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.hostUri;

  const ip = debuggerHost?.split(':')[0];
  if (ip) {
    baseURL = `http://${ip}:3000`;
  }
}

const api = axios.create({ baseURL });

export default api;
