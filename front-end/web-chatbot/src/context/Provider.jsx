import PropTypes from 'prop-types';
import { useState } from 'react';
import MyContext from './Context.js';

function Provider({ children }) {
  const [histories, setHistories] = useState([]);
  const [chatConversation, setChatConversation] = useState([]);  
  const [chatParameters, setChatParameters] = useState({
    messages: [],
    userLogged: false,
    username: '',
    usernameGetter: false,
    passwordGetter: false,  
    inRegister: false,  
    loginTries: 0,
  });

  
  const INITIAL_STATE = {
    histories,
    setHistories,    
    chatConversation,
    setChatConversation,
    chatParameters,
    setChatParameters,
  };

  return (
    <MyContext.Provider value={ INITIAL_STATE }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
