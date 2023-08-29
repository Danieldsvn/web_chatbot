import { useState, useEffect, useRef } from 'react';
import './App.css';
import formatDateTime from './helpers/currentDateGenerator';

function ChatbotApp() {

  const chatMessagesRef = useRef(null);

  const correctUsername = 'danieldsvn@gmail.com';
  const correctPassword = '123456';

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState(''); 
  const [userLogged, setUserLogged] = useState(false);
  const [usernameGetter, setUsernameGetter] = useState(false);  
  const [passwordGetter, setPasswordGetter] = useState(false); 
  const [username, setUsername] = useState('');  

  const greetings = ["hello", "good", "i want"];

  useEffect(() => {
    // Scroll the chat to the bottom whenever messages are updated    
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);
  
  
  const handleUserMessage = () => {
    const userMessage = userInput.trim();
    if (userMessage === '') return;
    
    appendMessage('You:', userMessage);    
    
    // User first interaction
    const userWantsToTalk = greetings.some((greeting) => (greeting === userMessage.toLowerCase()));
   if (userWantsToTalk && !userLogged) {
    
    setTimeout(() => {      
      setUsernameGetter(true);    
      appendMessage('Chatbot:', 'Hello, User, enter with your credentials.');
      appendMessage('Chatbot:', 'Type your username');
      }, "1000");  
    setUserInput('');
    return;
    }

    // Login flow
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
        setUserLogged(true);
        appendMessage('Chatbot:', `${username}, you are logged in!`);
      } else {
        appendMessage('Chatbot:', 'Wrong password, try again!');
      }     
    }


    // User Looged flow
    if(userLogged) {
      if (userMessage.toLowerCase().includes('loan')) {      
      setTimeout(() => {
        appendMessage('Chatbot:', `Click on the option below`);
        loanOptions();
      }, "1000")
      setUserInput('');
      return;
    }
    
    // End conversation flow
      if (userMessage.toLowerCase().includes('goodbye')) {
        // Save conversation to database and perform other actions
        const conversationEndTime = formatDateTime();

        appendMessage('Chatbot:', `Goodbye, ${username}! Conversation ended.`);
        appendMessage('Chatbot:', `Conversation user, ${username}! ${conversationEndTime}`);
        console.log(messages); // Send to database
        // appendMessage('Chatbot:', `${conversationHistoric}`);
        setUserInput('');
        return;
      }
    }
    
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

  const handleHistoric = () => {
    console.log("Open a page with historic and to be able to export in CSV ordered by date");
  }

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={chatMessagesRef}>
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
        <button onClick={handleHistoric}>Conversation historic</button>
      </div>
    </div>
  );
}

export default ChatbotApp;
