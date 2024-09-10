import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import { getNotes } from "./services/noteDB"
// import {getTodos} from "./services/todoDB"

import Note from "./screens/Note";
import Todo from "./screens/Todo";

const Tab = createBottomTabNavigator();

function MainScreen() {
  const [notes, setNotes] = useState([])
  const [todos, setTodos] = useState([])

  const fetchNotes = () => {
    try {
      getNotes().then(data=>{
        console.log(data);
        // setNotes(data);
      })
    }catch(error){
      console.log(error);
      alert("Xatolik!")
    }
  }
  
  useEffect(()=>{
    fetchNotes()
  }, [])
  return (
    <Tab.Navigator
      initialRouteName="Note"
      screenOptions={{
        tabBarActiveTintColor: '#00f',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#272730' },
        headerStyle: { backgroundColor: "#272730" },
        headerTitleStyle: {color: "#fff"}
      }}
    >
      <Tab.Screen
        name="Note"
        component={Note}
        options={{
          tabBarLabel: 'Notes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note-edit-outline" color={color} size={size} />
          )
        }}
      />
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