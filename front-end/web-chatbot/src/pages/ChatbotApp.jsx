import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChatbotApp.css';
import formatDateTime from '../helpers/currentDateGenerator';
import { fetchLogin } from '../service/LoginService';
import { fetchChatHistory, getChatHistory } from '../service/ChatHistoryService';
import MyContext from '../context/Context';
import Header from '../components/Header';
import { fetchRegister } from '../service/RegisterService';

function ChatbotApp() {
  const navigate = useNavigate();
  
  const {
    setHistories,    
    chatParameters,
    setChatParameters,
  } = useContext(MyContext)

  const chatMessagesRef = useRef(null);  

  const [messages, setMessages] = useState([]);  
  const [userInput, setUserInput] = useState(''); 
  const [userLogged, setUserLogged] = useState(false);
  const [usernameGetter, setUsernameGetter] = useState(false);  
  const [passwordGetter, setPasswordGetter] = useState(false); 
  const [inRegister, setInRegister] = useState(false); 
  const [username, setUsername] = useState('');  
  

  const greetings = ["hello", "good", "i want"];  

  const appendInitialMessage = () => {
    if(messages.length === 0) {
      setTimeout(() => {
        setMessages([
          ...messages,
          {
            sender: 'Chatbot:',
            content: 'Hello, User, type "hello" to login and start a conversation',
          },
        ]);        
      }, '1000');
    }
  };

  useEffect(() => {    
      const { messages, userLogged, username, usernameGetter, passwordGetter, inRegister } = chatParameters;
      setMessages(messages);
      setUserLogged(userLogged);
      setUsername(username);
      setUsernameGetter(usernameGetter);
      setPasswordGetter(passwordGetter);
      setInRegister(inRegister);
      if(messages.length === 0) return appendInitialMessage();  
  }, []);

  useEffect(() => {
    // Scroll the chat to the bottom whenever messages are updated        
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }    
  }, [messages]);
  
  // Main function that handles all messages
  const handleUserMessage = async () => {


    const userMessage = userInput.trim();
    if (userMessage === '') return;
    
    appendMessage('You:', userMessage);      
   
    
    // User first interaction
    const userWantsToTalk = greetings.some((greeting) => (greeting === userMessage.toLowerCase()));
   if (userWantsToTalk && !userLogged) {
    
    setTimeout(() => {  
      localStorage.clear();
      setMessages([]);      
      appendMessage('You:', userMessage);
      setUsernameGetter(true);    
      appendMessage('Chatbot:', 'Hello, User, enter with your credentials.');
    }, "750");  
    setTimeout(() => {
        appendMessage('Chatbot:', 'Type your username');        
      }, '2000');
    setUserInput('');
    return;
    }

    // Login/register flow
   if(usernameGetter) {   
    if(!passwordGetter) {
      setUsername(userInput);
      setTimeout(() => {
        appendMessage('Chatbot:', 'Type your password');       
      }, '750');
      setPasswordGetter(true);
    }     
    if(passwordGetter) {
      let userData = {};
      const userPassword = userInput;
      if(inRegister) {       
        userData = await fetchRegister(username, userPassword);
      } else if(!inRegister) {
         userData = await fetchLogin(username, userPassword);
      }
      if(userData.message) {
        setPasswordGetter(false);
        appendMessage('Chatbot:', `${userData.message}`);
        appendMessage('Chatbot:', 'Type your username');
      }    
      if(userData.accessToken) {
        localStorage.setItem('user', JSON.stringify(userData));
        setUserLogged(true);
        setUsernameGetter(false);
        setPasswordGetter(false);
        setTimeout(() => {
          appendMessage('Chatbot:', `${userData.name}, you are logged in!`);          
        }, '750');
        setTimeout(() => {
          appendMessage('Chatbot:', `Type 'loan' for more information or type 'goodbye' to end this conversation`);          
        }, '1500');
        setUserInput('');
        return;
      }
      if(userData.name) {
        // asd
        setInRegister(false);
        setUsernameGetter(false);
        setPasswordGetter(false);
        setTimeout(() => {
          appendMessage('Chatbot:', `${userData.name}, you are registered!`);          
        }, '750');
        setTimeout(() => {
          appendMessage('Chatbot:', 'Type "hello" to start a conversation');
        }, '2000');
      }     
    }
    }

    // User Looged flow
    if(userLogged) {
      if (userMessage.toLowerCase().includes('loan')) {      
      setTimeout(() => {
        appendMessage('Chatbot:', `Click on the option below`);
        loanChatOptions();
      }, "1000")
      setUserInput('');
      return;
    }
    
    // End conversation flow
      if (userMessage.toLowerCase().includes('goodbye')) {
        // Save conversation to database and perform other actions
        const conversationEndTime = formatDateTime();
        setTimeout(() => {
          appendMessage('Chatbot:', `Goodbye, ${username}! Conversation ended.`);          
        }, '750');
        setTimeout(() => {
          appendMessage('Chatbot:', `Conversation user, ${username}! ${conversationEndTime}`);          
        }, '1500');
        setTimeout(() => {
          appendMessage('Chatbot:', `To start a new conversation type "hello"`);
        }, '2500');

        const allMessages = [
          ...messages,
          { sender: 'Chatbot:', content: `Goodbye, ${username}! Conversation ended.` },
          { sender: 'Chatbot:', content: `Conversation user, ${username}! ${conversationEndTime}` },          
        ];

        setChatParameters({
          ...chatParameters,
          messages: allMessages,
        });
       
        const messagesFixedLinks = allMessages.map((message) => {         
          if(message.string) return {sender: message.sender, content: message.string}
          return message;       
        });        
        
        // Send to database
        const conversationHistoric = messagesFixedLinks.reduce((acc, message) => {
          return `${acc}${message.sender} ${message.content}\n`;
        }, "");        
        
        const { id, accessToken } = JSON.parse(localStorage.getItem('user'));        

        await fetchChatHistory(id, conversationHistoric, accessToken);                
        
        setUserInput('');   
        setUserLogged(false);             
        
        return;
      }
    }
    
    setUserInput('');
  };  

  const loanChatOptions = () => {
    const option1 = 'Do you want to apply for a loan?'
    const option2 = 'Loan conditions'
    const option3 = 'Help'
    
    const newMessage1 = {
      sender: '1:',
      content: <button onClick={(e) => handleLoanOptionLink(e)}>{option1}</button>,
      string: option1,
    };

    const newMessage2 = {
      sender: '2:',
      content: <button onClick={(e) => handleLoanOptionLink(e)}>{option2}</button>,
      string: option2,
    };

    const newMessage3 = {
      sender: '3:',
      content: <button onClick={(e) => handleLoanOptionLink(e)}>{option3}</button>,
      string: option3,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage1]);
    setMessages((prevMessages) => [...prevMessages, newMessage2]);
    setMessages((prevMessages) => [...prevMessages, newMessage3]);
}
  const appendMessage = (sender, message) => {
    if (passwordGetter && sender === 'You:') {      
      let hidePassword = '';
      const numberOfAsterisks = message.length;
      for(let i = 0; i < numberOfAsterisks; i++) {
        hidePassword += '*';
      }
      const newMessage = {
        sender: sender,
        content: hidePassword,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);      
      return;
    }
    
    const newMessage = {
      sender: sender,
      content: message,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);      
  };

  const handleLoanOptionLink = ({target}) => {
    const option1 = 'Do you want to apply for a loan?'
    const option2 = 'Loan conditions'
    const option3 = 'Help' 
    const clickHere = 'Click here for details';   

    if(target.innerText === option1) {      
      appendMessage('ChatBot:', 'Be aware if you can settle the debt in the future.');
      const link = <a href="https://www.nerdwallet.com/uk/loans/personal-loans/tips-for-successfully-applying-for-a-loan/" target="_blank" rel="noreferrer">{clickHere}</a>      

      const newMessage = {
        sender: 'ChatBot:',
        content: link,
        string: clickHere,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    
    if(target.innerText === option2) {
      appendMessage('ChatBot:', 'Know the loan terms.');
      const link = <a href="https://www.investopedia.com/loan-terms-5075341" target="_blank" rel="noreferrer">{clickHere}</a>      

      const newMessage = {
        sender: 'ChatBot:',
        content: link,
        string: clickHere,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    if(target.innerText === option3) {
      appendMessage('ChatBot:', 'If you need help to know more about loan...');
      const link = <a href="https://www.investopedia.com/terms/l/loan.asp" target="_blank" rel="noreferrer">{clickHere}</a>      

      const newMessage = {
        sender: 'ChatBot:',
        content: link,
        string: clickHere,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    
  };

  const handleHistoricButton = async() => {
    setChatParameters({      
      messages: messages,
      userLogged: userLogged,
      username: username,
      usernameGetter: usernameGetter,
      passwordGetter: passwordGetter,
      inRegister: inRegister,
    });
    
    const { id, accessToken } = JSON.parse(localStorage.getItem('user'));     

    const userHistories = await getChatHistory(id, accessToken);

    setHistories(userHistories);    

    navigate('/csv');
  }

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUserMessage();
    }
  };

  return (
    <div className="chat-container">
      <Header
        appendMessage={appendMessage}
        setInRegister={setInRegister}
        setUsernameGetter={setUsernameGetter}
        userLogged={userLogged}
        username={username}
      />
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.sender}</strong> {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type={passwordGetter ? 'password' : 'text'}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleEnterKeyPress}
          placeholder="Type your message..."
        />
        <button         
          onClick={handleUserMessage}
          className="send-button"
        >
          Send
        </button>
        <button
          disabled={!userLogged}
         onClick={handleHistoricButton}
         className="historic-button"
        >
          Conversation historic
        </button>
      </div>
    </div>
  );
}

export default ChatbotApp;
