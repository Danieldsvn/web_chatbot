import PropTypes from 'prop-types';
import '../styles/Header.css'


function Header({appendMessage, setInRegister, setUsernameGetter}) {

  const handleSignUpButton = () => {
    setInRegister(true);
    setUsernameGetter(true);
    appendMessage('Chatbot:', 'Let\'s register you');
    setTimeout(() => {
      appendMessage('Chatbot:', 'Type your username');      
    }, '1000');
  }
  return(
    <div className='chat-header'>
      <h1 className='chat-title'>Web Chatbot</h1>
      <button
        className='sign-up-button'
        onClick={handleSignUpButton}
      >
        SignUp
      </button>
    </div>
  )
}


Header.propTypes = {
  appendMessage: PropTypes.func.isRequired,
  setInRegister: PropTypes.func.isRequired,
  setUsernameGetter: PropTypes.func.isRequired,
};

export default Header;

