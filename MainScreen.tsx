import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import { Note as INote, Todo as ITodo, getNotes, getTodos } from './services/db';

import Note from "./screens/Note";
import Todo from "./screens/Todo";
import { Alert } from 'react-native';

const Tab = createBottomTabNavigator();

function MainScreen() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await fetchData();
      } catch (error) {
        Alert.alert('Database Error', 'Could not initialize database');
      }
    };

    setupDatabase();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
      const fetchedTodo = await getTodos();
      setTodos(fetchedTodo);
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
            <MaterialCommunityIcons name="note-edit-outline" color={color} size={size+3} />
          ),
          tabBarBadge: notes.length? notes.length: undefined,
        }}
      >
        {({navigation})=><Note notes={notes} navigation={navigation} fetchData={fetchData} />}
      </Tab.Screen>
      <Tab.Screen
        name="ToDo"
        options={{
          tabBarLabel: 'TODO list',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="list-check" color={color} size={size} />
          ),
          tabBarBadge: todos.length? todos.length: undefined,
        }}
      >
        {({navigation})=><Todo todos={todos} navigation={navigation} fetchData={fetchData} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default MainScreen;