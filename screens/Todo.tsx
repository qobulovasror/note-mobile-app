import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  BackHandler,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import mainStyle from '../assets/styles/mainStyle';
import { useEffect, useState } from 'react';
import { addTodos, deleteTodo, Todo as ITodo, checkedTodo } from '../services/db';
import { noteStyle } from '../assets/styles/noteStyle';

interface TodoProps {
  todos: ITodo[];
  navigation: any;
  fetchData: ()=>void
}

const Todo = (props: TodoProps) => {
  const { todos, fetchData } = props;
  const [addTodoWin, setAddTodoWin] = useState(false);

  const handleBackPress = () => {
    if (addTodoWin) {
      setAddTodoWin(false);
      return true; 
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [addTodoWin]);

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        style="light"
      />
      {
        addTodoWin && 
        (<AddTodo
          setAddTodoWin={setAddTodoWin}
          fetchData={fetchData}
        />)
      }
      <FlatList
        data={todos}
        style={{ padding: 2 }}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            fetchData={fetchData}
          />
        )}
        keyExtractor={( _ , index) => index.toString()}
      />
      <TouchableOpacity style={mainStyle.addBtn} onPress={() => setAddTodoWin(true)}>
        <Ionicons name="add-circle" color={'#fff'} size={40} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

interface ITodoItem {
  item: ITodo;
  fetchData: () => void;
}

const TodoItem = (props: ITodoItem) => {
  const { item, fetchData } = props;
  
  const deleteItem = (id: number) => {
    Alert.alert(
      'Confirm Action',
      'Are you sure you want to delete this?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteTodo(id);
            fetchData();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const checkItem = (id: number, status: string) => {
    if (id!==0) {
      if(status === 'completed'){
        checkedTodo(id, 'uncompleted');
      }else{
        checkedTodo(id, 'completed');
      }
      fetchData();
    }
  }

  return (
    <TouchableOpacity
      onPress={() => checkItem((item.id)? item.id : 0, item.status)}
      style={noteStyle.itemContainer}
    >
      <View
        style={[mainStyle.row, mainStyle.between]}
      >
        <View style={mainStyle.row}>
          {
            item.status === 'completed'?
            <MaterialIcons name="check-circle-outline" size={28} color="#fff" /> :
            <MaterialIcons name="radio-button-unchecked" size={28} color="#fff" />
          }
          <Text style={[{ marginStart: 15, fontSize: 20, color: '#fff' }, item.status === 'completed' ? { textDecorationLine: 'line-through'} : {}]}>
            {item.name.toString().length > 35
              ? item.name.slice(0, 33) + '...'
              : item.name}
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ padding: 15, margin: -15 }}
            onPress={() => deleteItem((item.id)? item.id : 0)}
          >
            <MaterialIcons name="delete-outline" size={28} color="#f00" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};


interface IAddTodo {
  setAddTodoWin: (t: boolean) => void;
  fetchData: () => void;
}

const AddTodo = (props: IAddTodo) => {
  const { setAddTodoWin, fetchData } = props;
  const [input, setInput] = useState('');

  const handleCancel = () => {
    setAddTodoWin(false);
    setInput('');
  };

  const handleOK = async () => {
    if(!input) return Alert.alert("Sorry", "The field is required");
      try {
        await addTodos({
          name: input,
          status: 'uncompleted',
          createdAt: new Date().toISOString()
        })
        handleCancel();
        fetchData();
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <View
      style={noteStyle.addItemContainer}
    >
      <View style={[mainStyle.row, mainStyle.between]}>
        <TouchableOpacity onPress={handleCancel} style={{paddingHorizontal: 10}}>
          <Ionicons name="chevron-back-sharp" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={{color: '#fff', fontSize: 22}}>Add Todo</Text>
        <View style={{paddingHorizontal: 10}}></View>
      </View>

      <View style={{marginVertical: 20}}>
        <TextInput
          placeholder="Task name"
          style={noteStyle.input}
          placeholderTextColor={'#ccc'}
          onChangeText={(text) => setInput(text)}
          value={input}
        />
      </View>

      <TouchableOpacity onPress={handleOK} style={{alignSelf: 'flex-end', marginRight: 10, position: 'absolute', bottom: 20, right: 10, borderRadius: '50%', borderWidth: 1, padding: 10, borderColor: '#ccc',}}>
        <Entypo name="check" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;