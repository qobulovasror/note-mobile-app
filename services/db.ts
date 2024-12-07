import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseAsync('todo_note.db');
export default db;