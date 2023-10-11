import PropTypes from 'prop-types';
import '../styles/Header.css'


function Header({appendMessage, setInRegister, setUsernameGetter, userLogged, username}) {

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
      { userLogged ? <p>User {username}</p> : <p></p>}
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
  userLogged: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};

export default Header;

