export const fetchChatHistory = async (userId, conversation) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: userId,
      conversation: conversation,
    }),
  };

  const notStored = 500;
  const created = 201;  

  try {
    const response = await fetch('http://localhost:3001/chat-history', options);
    if (response.status === created) {
      const data = await response.json();
      return data;
    }if(response.status == notStored) {      
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};