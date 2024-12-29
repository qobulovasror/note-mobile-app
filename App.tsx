import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './MainScreen';
import { useEffect, useState,  } from 'react';
import { initDatabase } from './services/db';

export default function App() {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      initDatabase()
      setInitialized(true);
    }
  }, [initialized]);

  return (
    <NavigationContainer>
      <MainScreen/>
    </NavigationContainer>
  );
}