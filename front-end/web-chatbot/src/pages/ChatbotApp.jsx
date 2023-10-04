import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChatbotApp.css';
import formatDateTime from '../helpers/currentDateGenerator';
import { fetchLogin } from '../service/LoginService';
import { fetchChatHistory, getChatHistory } from '../service/ChatHistoryService';
import MyContext from '../context/Context';

function ChatbotApp() {
  const navigate = useNavigate();
  
  const {setHistories} = useContext(MyContext)

  const chatMessagesRef = useRef(null);  

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
  
  
  const handleUserMessage = async () => {
    const userMessage = userInput.trim();
    if (userMessage === '') return;
    
    appendMessage('You:', userMessage);    
    
    // User first interaction
    const userWantsToTalk = greetings.some((greeting) => (greeting === userMessage.toLowerCase()));
   if (userWantsToTalk && !userLogged) {
    
    setTimeout(() => {      
      setMessages([]);
      appendMessage('You:', userMessage);
      setUsernameGetter(true);    
      appendMessage('Chatbot:', 'Hello, User, enter with your credentials.');
      appendMessage('Chatbot:', 'Type your username');
      }, "1000");  
    setUserInput('');
    return;
    }

    // Login flow
   if(usernameGetter) {   
    if(!passwordGetter) {
      setUsername(userInput);
      appendMessage('Chatbot:', 'Type your password');        
      setPasswordGetter(true);
    }     
    if(passwordGetter) {
      const userPassword = userInput;
      const userData = await fetchLogin(username, userPassword);
      if(userData.message) {
        setPasswordGetter(false);
        appendMessage('Chatbot:', `${userData.message}`);
        appendMessage('Chatbot:', 'Type your username');
      }    
      if(userData.name) {
        localStorage.setItem('user', JSON.stringify(userData));
        setUserLogged(true);
        setUsernameGetter(false);
        setPasswordGetter(false);
        appendMessage('Chatbot:', `${userData.name}, you are logged in!`);
      }      
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

        const allMessages = [
          ...messages,
          { sender: 'Chatbot:', content: `Goodbye, ${username}! Conversation ended.` },
          { sender: 'Chatbot:', content: `Conversation user, ${username}! ${conversationEndTime}` },
        ];
      
        // Send to database
        const conversationHistoric = allMessages.reduce((acc, message) => {
          return `${acc}${message.sender} ${message.content}\n`;
        }, "");        
        
        const { id } = JSON.parse(localStorage.getItem('user'));        

        await fetchChatHistory(id, conversationHistoric);                
        
        setUserInput('');
        setUserLogged(false);
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

  const handleHistoric = async() => {
    const { id } = JSON.parse(localStorage.getItem('user'));     

    const userHistories = await getChatHistory(id);

    setHistories(userHistories);

    console.log(userHistories);

    navigate('/csv');
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
