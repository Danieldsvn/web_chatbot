const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const greetings = ["hello", "good", "i want"];
sendButton.addEventListener('click', handleUserMessage);

function handleUserMessage() {
  const userMessage = userInput.value;
  appendMessage('You', userMessage);

  const userWantsToTalk = greetings.some((greeting) => (greeting === userMessage));
  if (userWantsToTalk) {
    // Save conversation to database and perform other actions
    setTimeout(() => {      
      appendMessage('Chatbot', 'Hello, User, enter with your credentials.');
    }, "1000");  
    return;
  }

  if (userMessage.toLowerCase().includes('loan')) {
    // Save conversation to database and perform other actions
    appendMessage('Chatbot', `Options:`);
    loanOptions();
    return;
  }

  if (userMessage.toLowerCase().includes('goodbye')) {
    // Save conversation to database and perform other actions
    appendMessage('Chatbot', 'Goodbye! Conversation ended.');
    return;
  }

  // Implement logic to interpret other terms and generate appropriate responses
  // For simplicity, we'll just echo back the user's message for now
  const botResponse = userMessage;

  
  userInput.value = '';
}

function appendMessage(sender, message) {  
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function loanOptions() {
  const option1 = 'Do you want to apply for a loan?'
  const option2 = '\nLoan conditions'
  const option3 = '\nHelp'
  
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `
  ${option1}
  ${option2}
  ${option3}
  `;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
