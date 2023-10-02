import connection from './connection.js';

export const createModel = async (data) => {
  const {userId, conversation} = data;
  const result = await connection.execute(
      // eslint-disable-next-line max-len
      'INSERT INTO Chatbot.chat_history (user_id, chat_history, timestamp) VALUES (?, ?, NOW())',
      [userId, conversation],

  );

  return {id: result[0].insertId};
};

export const getByIdModel = async (id) => {
  const result = await connection.execute(
      'SELECT chat_history FROM Chatbot.chat_history WHERE user_id = ?',
      [id],

  );
    console.log('getByIdModel da ChathHstoryModel');
  return result[0];
};
