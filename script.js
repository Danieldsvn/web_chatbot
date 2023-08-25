const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const greetings = ["hello", "good", "i want"];
sendButton.addEventListener('click', handleUserMessage);

function handleUserMessage() {
  const userMessage = userInput.value;
  appendMessage('You', userMessage);

  const userWantsToTalk = greetings.some((greeting) => (greeting === userMessage))
  if (userWantsToTalk) {
    // Save conversation to database and perform other actions
    appendMessage('Chatbot', 'Hello User, ask anything you want.');
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

  // appendMessage('fezes', botResponse);
  userInput.value = '';
}

function appendMessage(sender, message) {
  setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, "1000");  
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
