import db from "./db"

const createNoteTable = () => {
  // db.transaction((tx) => {
  //   tx.executeSql(
  //     'CREATE TABLE IF NOT EXISTS note ( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, body TEXT NOT NULL);',
  //     [],
  //     () => {},
  //     (_, err) => {
  //       console.log(err);
  //       alert('Xatolik!');
  //     }
  //   );
  // });
};


// Add a new note
const addNote = (title, body) => {
  // try {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'INSERT INTO note (title, body) VALUES (?, ?);',
  //       [title, body],
  //       () => {},
  //       (_, err) => {
  //         console.log(err);
  //         alert('Xatolik!');
  //       }
  //     );
  //   });
  // } catch (error) {
  //   alert(error);
  // }
};

// Retrieve all notes
const getNotes = () => {
  // return new Promise((resolve, reject) => {
  //   try {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         'SELECT * FROM note',
  //         [],
  //         (tx, results) => {
  //           if (results.rows.length > 0) {
  //             resolve(results.rows.item(0).value);
  //           } else {
  //             resolve(null);
  //           }
  //         },
  //         (_, error) => {
  //           console.log('err');
  //           reject(error);
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     console.log('err');
  //     reject(error);
  //   }
  // });
};

// Update an existing note
const updateNote = (id, title, body) => {
  // try {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'UPDATE note SET title = ?, body = ? WHERE id = ?;',
  //       [title, body, id],
  //       () => {},
  //       (_, err) => {
  //         console.log(err);
  //         alert('Xatolik!');
  //       }
  //     );
  //   });
  // } catch (error) {
  //   alert(error);
  // }
};

// Delete a note
const deleteNote = (id) => {
  // db.transaction((tx) => {
  //   tx.executeSql(
  //     'DELETE FROM note WHERE id = ?;',
  //     [id],
  //     () => {},
  //     (_, err) => {
  //       console.log(err);
  //       alert('Xatolik!');
  //     }
  //   );
  // });
};

export { createNoteTable, addNote, getNotes, updateNote, deleteNote };
