export const fetchChatHistory = async (userId, conversation, token) => {  
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
     },
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

export const getChatHistory = async (id, token) => {  
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
     },    
  };
  try {
    const response = await fetch(`http://localhost:3001/chat-history/${id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};