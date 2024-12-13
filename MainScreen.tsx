import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
// import { getNotes } from "./services/noteDB"
// import {getTodos} from "./services/todoDB"
import { Note as INote, getNotes, initDatabase } from './services/db';


import Note from "./screens/Note";
import Todo from "./screens/Todo";
import { Alert } from 'react-native';

const Tab = createBottomTabNavigator();

function MainScreen() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDatabase();
        await fetchNotes();
      } catch (error) {
        Alert.alert('Database Error', 'Could not initialize database');
      }
    };

    setupDatabase();
  }, []);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      Alert.alert('Fetch Error', 'Could not fetch notes');
    }
  };


  return (
    <Tab.Navigator
      initialRouteName="Note"
      screenOptions={{
        tabBarActiveTintColor: '#00f',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#272730' },
        headerStyle: { backgroundColor: "#272730" },
        headerTitleStyle: { color: "#fff" }
      }}
    >
      <Tab.Screen
        name="Note"
        options={{
          tabBarLabel: 'Notes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note-edit-outline" color={color} size={size} />
          )
        }}
      >
        {({navigation})=><Note notes={notes} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen
        name="ToDo"
        component={Todo}
        options={{
          tabBarLabel: 'TODO list',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="list-check" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;