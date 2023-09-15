import connection from './connection.js';

export const createModel = async (data) => {
  const {name, password} = data;
  const result = await connection.execute(
      'INSERT INTO Chatbot.users (name, password) VALUES (?, ?)',
      [name, password],

  );

  return {id: result[0].insertId, name};
};

export const getByIdModel = async (id) => {
  const result = await connection.execute(
      'SELECT * FROM Chatbot.users WHERE id = ?',
      [id],

  );

  return result[0][0];
};

export const getByName = async (name) => {
  const result = await connection.execute(
      'SELECT * FROM Chatbot.users WHERE name = ?',
      [name],

  );

  return result[0][0];
};
