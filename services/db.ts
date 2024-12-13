import * as SQLite from 'expo-sqlite';

export interface Note {
  id?: number;
  title: string;
  content: string;
  createdAt: string;
}

export async function initDatabase() {
  try {
    const db = await SQLite.openDatabaseAsync('notes.db');
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT, 
        content TEXT, 
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
    const db = await SQLite.openDatabaseAsync('notes.db');
    
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
    const db = await SQLite.openDatabaseAsync('notes.db');
    
    const result = await db.getAllAsync<Note>(
      'SELECT * FROM notes ORDER BY createdAt DESC'
    );
    
    return result;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
}

export async function deleteNote(id: number) {
  try {
    const db = await SQLite.openDatabaseAsync('notes.db');
    
    await db.runAsync('DELETE FROM notes WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}