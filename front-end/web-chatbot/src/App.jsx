import { useState } from 'react';
import './App.css';

function ChatbotApp() {

  const correctUsername = 'danieldsvn@gmail.com';
  const correctPassword = '123456';

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState(''); 
  const [userLogged, setUserLogged] = useState(false);
  const [usernameGetter, setUsernameGetter] = useState(false);  
  const [passwordGetter, setPasswordGetter] = useState(false); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const greetings = ["hello", "good", "i want"];

  const handleUserMessage = () => {
    const userMessage = userInput.trim();
    if (userMessage === '') return;

    appendMessage('You:', userMessage);    

   if(usernameGetter) {        
      if(userInput === correctUsername) {
        setUsernameGetter(false);
        appendMessage('Chatbot:', 'Type your password');
        setUsername(userInput);
        setPasswordGetter(true);
      } else {
        appendMessage('Chatbot:', 'Wrong username, try again!');
      }     
    }

    if(passwordGetter) {     
      if(userInput === correctPassword) {
        setPasswordGetter(false);        
        setPassword(userInput);
        setUserLogged(true);
        appendMessage('Chatbot:', `${username}, you are logged in!`);
      } else {
        appendMessage('Chatbot:', 'Wrong password, try again!');
      }     
    }

    const userWantsToTalk = greetings.some((greeting) => (greeting === userMessage.toLowerCase()));
   if (userWantsToTalk && !userLogged) {
    // Save conversation to database and perform other actions
    setTimeout(() => {      
      setUsernameGetter(true);    
      appendMessage('Chatbot:', 'Hello, User, enter with your credentials.');
      appendMessage('Chatbot:', 'Type your username');
      }, "1000");  
    setUserInput('');
    return;
    }

    if(userLogged) {
      if (userMessage.toLowerCase().includes('loan')) {
      // Save conversation to database and perform other actions
      setTimeout(() => {
        appendMessage('Chatbot:', `Click on the option below`);
        loanOptions();
      }, "1000")
      setUserInput('');
      return;
    }
  
      if (userMessage.toLowerCase().includes('goodbye')) {
        // Save conversation to database and perform other actions
        appendMessage('Chatbot:', `Goodbye, ${username}! Conversation ended.`);
        setUserInput('');
        return;
      }
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
      content: <button onClick={(e) => handleLoanOptionClick(e)}>{option1}</button>,
    };

    const newMessage2 = {
      sender: '2',
      content: <button onClick={(e) => handleLoanOptionClick(e)}>{option2}</button>,
    };

    const newMessage3 = {
      sender: '3',
      content: <button onClick={(e) => handleLoanOptionClick(e)}>{option3}</button>,
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

  const handleLoanOptionClick = ({target}) => {
    const option1 = 'Do you want to apply for a loan?'
    const option2 = 'Loan conditions'
    const option3 = 'Help'    

    if(target.innerText === option1) {      
      appendMessage('ChatBot:', 'Be aware if you can settle the debt in the future.');
      const link = <a href="https://www.nerdwallet.com/uk/loans/personal-loans/tips-for-successfully-applying-for-a-loan/" target="_blank" rel="noreferrer">Click here for details</a>      

      const newMessage = {
        sender: 'ChatBot:',
        content: link,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    
    if(target.innerText === option2) {
      appendMessage('ChatBot:', 'Know the loan terms.');
      const link = <a href="https://www.investopedia.com/loan-terms-5075341" target="_blank" rel="noreferrer">Click here for details</a>      

      const newMessage = {
        sender: 'ChatBot:',
        content: link,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    if(target.innerText === option3) {
      appendMessage('ChatBot:', 'If you need help to know more about loan...');
      const link = <a href="https://www.investopedia.com/terms/l/loan.asp" target="_blank" rel="noreferrer">Click here for details</a>      

      const newMessage = {
        sender: 'ChatBot:',
        content: link,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.sender}</strong> {message.content}
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
