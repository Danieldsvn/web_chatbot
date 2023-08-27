import { useState } from 'react';
import './App.css';

function ChatbotApp() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const greetings = ["hello", "good", "i want"];

  const handleUserMessage = () => {
    const userMessage = userInput.trim();
    if (userMessage === '') return;

    appendMessage('You', userMessage);

    const userWantsToTalk = greetings.some((greeting) => (greeting === userMessage));
   if (userWantsToTalk) {
    // Save conversation to database and perform other actions
    setTimeout(() => {      
      appendMessage('Chatbot', 'Hello, User, enter with your credentials.');
    }, "1000");  
    setUserInput('');
    return;
    }

    if (userMessage.toLowerCase().includes('loan')) {
    // Save conversation to database and perform other actions
    appendMessage('Chatbot', `Type the number of the option to proceed`);
    loanOptions();
    setUserInput('');
    return;
  }

    if (userMessage.toLowerCase().includes('goodbye')) {
      // Save conversation to database and perform other actions
      appendMessage('Chatbot', 'Goodbye! Conversation ended.');
      setUserInput('');
      return;
    }

    // Implement logic to interpret other terms and generate appropriate responses
    // For simplicity, we'll just echo back the user's message for now
    // const botResponse = userMessage;

    // appendMessage('Chatbot', botResponse);
    setUserInput('');
  };

  const loanOptions = () => {
    const option1 = ' Do you want to apply for a loan?'
    const option2 = ' Loan conditions'
    const option3 = ' Help'
    
    const newMessage1 = {
      sender: '1',
      content: option1,
    };

    const newMessage2 = {
      sender: '2',
      content: option2,
    };

    const newMessage3 = {
      sender: '3',
      content: option3,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage1]);
    setMessages((prevMessages) => [...prevMessages, newMessage2]);
    setMessages((prevMessages) => [...prevMessages, newMessage3]);
}
  const appendMessage = (sender, message) => {
    const newMessage = {
      sender: sender,
      content: message,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.sender}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleUserMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatbotApp;
