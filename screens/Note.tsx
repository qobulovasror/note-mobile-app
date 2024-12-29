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
import { addNote, deleteNote, Note as INote, updateNote } from '../services/db';
import { noteStyle } from '../assets/styles/noteStyle';

interface NoteProps {
  notes: INote[];
  navigation: any;
  fetchData: ()=>void
}

const Note = (props: NoteProps) => {
  const { notes, fetchData } = props;
  const [visible, setVisible] = useState(false);
  const [targetNote, setTargetNote] = useState<INote | null>(null);
  const [mode, setMode] = useState("");

  const openAddAndUpdateWin = (status = "add") => {
    setVisible(true);
    setMode(status);
  };

  const handleBackPress = () => {
    if (visible) {
      setVisible(false);
      return true; 
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [visible]);

  return (
    <SafeAreaView style={mainStyle.container}>
      <StatusBar
        backgroundColor="#272730"
        style="light"
      />
      {
        visible && 
        (<AddAndUpdateData
          mode={mode}
          visible={visible}
          setVisible={setVisible}
          setMode={setMode}
          fetchData={fetchData}
          targetNote={targetNote}
        />)
      }
      <FlatList
        data={notes}
        style={{ padding: 2 }}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            fetchData={fetchData}
            setTargetNote={setTargetNote}
            openAddAndUpdateWin={openAddAndUpdateWin}
          />
        )}
        keyExtractor={( _ , index) => index.toString()}
      />
      <TouchableOpacity style={mainStyle.addBtn} onPress={() => openAddAndUpdateWin("add")}>
        <Ionicons name="add-circle" color={'#fff'} size={40} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

interface ITodoItem {
  item: INote,
  fetchData: () => void,
  setTargetNote: (note: INote)=> void,
  openAddAndUpdateWin: (mode: string) => void
}

const TodoItem = (props: ITodoItem) => {
  const { item, fetchData, setTargetNote, openAddAndUpdateWin } = props;
  
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
            deleteNote(id);
            fetchData();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const openTargetNote = (item: INote) => {
    setTargetNote(item);
    openAddAndUpdateWin("update");
  };

  return (
    <View
      style={noteStyle.itemContainer}
    >
      <View
        style={[mainStyle.row, mainStyle.between]}
      >
        <Text style={{ fontSize: 20, color: '#fff' }}>
          {item.title.toString().length > 35
            ? item.title.slice(0, 33) + '...'
            : item.title}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ padding: 0, marginEnd: 15 }}
            onPress={() => deleteItem((item.id)? item.id : 0)}
          >
            <MaterialIcons name="delete-outline" size={28} color="#f00" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 0, marginStart: 15 }}
            onPress={() => openTargetNote(item)}
          >
            <Ionicons name="open-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ color: '#9C9C9DFF', marginVertical: 5 }}>
        {item.content.length > 203 ? item.content.slice(0, 200) + '...' : item.content}
      </Text>
    </View>
  );
};


interface IAddAndUpdateData {
  mode: string;
  visible: boolean;
  setVisible: any;
  setMode: (mode: string) => void;
  fetchData: () => void;
  targetNote: INote | null
}

const AddAndUpdateData = (props: IAddAndUpdateData) => {
  const { mode, setVisible, setMode, fetchData, targetNote } = props;
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');

  const handleCancel = () => {
    setVisible(false);
    setMode("");
    setInputTitle('');
    setInputContent('');
  };

  const handleOK = async () => {
    if(!inputTitle || !inputContent) return Alert.alert("Sorry", "All fields are required");
    if (mode === 'add') {
      try {
        await addNote({
          title: inputTitle,
          content: inputContent,
          createdAt: new Date().toISOString()
        })
        handleCancel();
        fetchData();
      } catch (error) {
        console.log(error);

      }
    }else{
      if(!targetNote) return alert("Error");
      const id = targetNote.id? targetNote.id : 0;
      if(!targetNote || !id) return alert("Error");
      try {
        await updateNote(id, {
          title: inputTitle,
          content: inputContent,
          createdAt: new Date().toISOString()
        })
        handleCancel();
        fetchData();
      } catch (error) {
        console.log(error);

      }
    }
  };

  useEffect(() => {
    if (mode === 'update') {
      if(!targetNote) return alert("Error");
      setInputTitle(targetNote.title);
      setInputContent(targetNote.content);
    }
  }, [mode, targetNote]);

  return (
    <View
      style={noteStyle.addItemContainer}
    >
      <View style={[mainStyle.row, mainStyle.between]}>
        <TouchableOpacity onPress={handleCancel} style={{paddingHorizontal: 10}}>
          <Ionicons name="chevron-back-sharp" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={{color: '#fff', fontSize: 22}}>
          {
            mode === 'add' ?
              "Add new note" :
              "Edit note"
          }
        </Text>
        <View style={{paddingHorizontal: 10}}></View>
      </View>

      <View style={{marginVertical: 20}}>
        <TextInput
          placeholder="Note title"
          style={noteStyle.input}
          placeholderTextColor={'#ccc'}
          onChangeText={(text) => setInputTitle(text)}
          value={inputTitle}
        />
        <TextInput
          multiline={true}
          placeholder="Type here"
          style={[noteStyle.input, {height: 150, textAlignVertical: 'top'}]}
          placeholderTextColor={'#ccc'}
          onChangeText={(text) => setInputContent(text)}
          value={inputContent}
        />
      </View>

      <TouchableOpacity onPress={handleOK} style={{alignSelf: 'flex-end', marginRight: 10, position: 'absolute', bottom: 20, right: 10, borderRadius: '50%', borderWidth: 1, padding: 10, borderColor: '#ccc',}}>
        <Entypo name="check" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Note;
