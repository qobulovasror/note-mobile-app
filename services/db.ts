import * as SQLite from 'expo-sqlite';

export interface Note {
  id?: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface Todo {
  id?: number;
  name: string;
  status: string;
  createdAt: string;
}

export async function initDatabase() {
  try {
    const db = await SQLite.openDatabaseAsync('appDB.db');
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT, 
        content TEXT, 
        createdAt TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        status TEXT, 
        createdAt TEXT
      );
    `);

    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

export async function addNote(note: Omit<Note, 'id'>) {
  try {
    const db = await SQLite.openDatabaseAsync('appDB.db');
    
    const result = await db.runAsync(
      'INSERT INTO notes (title, content, createdAt) VALUES (?, ?, ?)', 
      [note.title, note.content, note.createdAt]
    );
    
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
}

export async function getNotes() {
  try {
    const db = await SQLite.openDatabaseAsync('appDB.db');
    
    const result = await db.getAllAsync<Note>(
      'SELECT * FROM notes ORDER BY createdAt DESC'
    );
    
    return result;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
}

export async function updateNote(id: number, note: Omit<Note, 'id'>) {
  try {
    const db = await SQLite.openDatabaseAsync('appDB.db');
    
    const result = await db.runAsync(
      'UPDATE notes SET title=?, content=? WHERE id=?', 
      [note.title, note.content, id]
    );
    
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
}

export async function deleteNote(id: number) {
  try {
    const db = await SQLite.openDatabaseAsync('appDB.db');
    
    await db.runAsync('DELETE FROM notes WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}



// ========= FOR TODO table ========= //

export async function addTodos(todo: Omit<Todo, 'id'>) {
  try {
    const db = await SQLite.openDatabaseAsync('appDB.db');
    
    const result = await db.runAsync(
      'INSERT INTO todos (name, status, createdAt) VALUES (?, ?, ?)', 
      [todo.name, todo.status, todo.createdAt]
    );
    
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error adding todos:', error);
    throw error;
  }
}

export async function getTodos() {
  try {
    const db = await SQLite.openDatabaseAsync('appDB.db');
    
    const result = await db.getAllAsync<Todo>(
      'SELECT * FROM todos ORDER BY createdAt DESC'
    );
    
    return result;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

export async function checkedTodo(id: number, status: string) {
  try {
    const db = await SQLite.openDatabaseAsync('appDB.db');
    
    const result = await db.runAsync(
      'UPDATE todos SET status=? WHERE id=?', 
      [status, id]
    );
    
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}


export async function deleteTodo(id: number) {
  try {
    const db = await SQLite.openDatabaseAsync('appDB.db');
    
    await db.runAsync('DELETE FROM todos WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}