import connection from './connection.js';

export const createModel = async (data) => {
  const {name, password} = data;
  const result = await connection.execute(
      'INSERT INTO Chatbot.users (name, password) VALUES (?, ?)',
      [name, password],

  );

  return {id: result[0].insertId, name};
};
