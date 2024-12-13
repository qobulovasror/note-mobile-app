import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './MainScreen';
import {createNoteTable} from "./services/noteDB";
import {createTodoTable} from "./services/todoDB";
import { useEffect, useState,  } from 'react';

export default function App() {
  // const [initialized, setInitialized] = useState(false);
  // useEffect(() => {
  //   if (!initialized) {
  //     createNoteTable()
  //     createTodoTable()
  //     setInitialized(true);
  //   }
  // }, [initialized]);

  return (
    <NavigationContainer>
      <MainScreen/>
    </NavigationContainer>
  );
}