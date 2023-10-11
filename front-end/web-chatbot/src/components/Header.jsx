import PropTypes from 'prop-types';


function Header({appendMessage}) {

  const handleSignUpButton = () => {
    appendMessage('Chatbot:', 'Let\'s register you');
    setTimeout(() => {
      appendMessage('Chatbot:', 'Type your username');      
    }, '1000');
  }
  return(
    <div className='chat-header'>
      <h1>Header</h1>
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
  appendMessage: PropTypes.func.isRequired
};

export default Header;

