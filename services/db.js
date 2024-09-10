import * as SQLite from 'expo-sqlite/legacy';
const db = SQLite.openDatabase('todo_note.db');
export default db;