import connection from './connection.js';

export const createModel = async (data) => {
  const {userId, chatHistory} = data;
  const result = await connection.execute(
      // eslint-disable-next-line max-len
      'INSERT INTO Chatbot.chat_history (user_id, chat_history, timestamp) VALUES (?, ?, NOW())',
      [userId, chatHistory],

  );

  return {id: result[0].insertId};
};
