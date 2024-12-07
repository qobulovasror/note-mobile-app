import db from "./db"


// Create todo table
const createTodoTable = () => {
  // db.transaction((tx) => {
  //   tx.executeSql(
  //     'CREATE TABLE IF NOT EXISTS todo ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, status INTEGER );',
  //     [],
  //     () => {},
  //     (_, err) => {
  //       console.log(err);
  //       alert('Xatolik!');
  //     }
  //   );
  // });
};


// Add a new todo
const addTodo = (name, status) => {
  // try {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'INSERT INTO todo (name, status) VALUES (?, ?);',
  //       [name, status],
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


// Retrieve all todos
const getTodos = () => {
  // return new Promise((resolve, reject) => {
  //   try {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         'SELECT id, name, status FROM todo',
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




// Change todo status
const changeStatus = async (id, status) => {
  // try {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'UPDATE todo SET status = ? WHERE id = ?;',
  //       [status, id],
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

// Delete a todo
const deleteTodo = async (id) => {
  // db.transaction((tx) => {
  //   tx.executeSql(
  //     'DELETE FROM todo WHERE id = ?;',
  //     [id],
  //     () => {},
  //     (_, err) => {
  //       console.log(err);
  //       alert('Xatolik!');
  //     }
  //   );
  // });
};

export { createTodoTable, addTodo, getTodos, changeStatus, deleteTodo };
