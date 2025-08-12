import * as React from 'react';
import { Provider as PaperProvider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const scheme = useColorScheme();

  const theme = {
    ...(scheme === 'dark' ? MD3DarkTheme : DefaultTheme),
    colors: {
      ...(scheme === 'dark' ? MD3DarkTheme.colors : DefaultTheme.colors),
      primary: '#1e88e5',
      onPrimary: '#ffffff',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <HomeScreen />
    </PaperProvider>
  );
}
