const socket = io('https://special-garnet-bone.glitch.me/'); // Replace with your Glitch URL
;
// Log successful connection
socket.on('connect', () => {
    console.log('Connected to the server');
});

// Log connection errors
socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

const usernameInput = document.getElementById('username');
const avatarSelect = document.getElementById('avatarSelect');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('messages');

// Send message to server when the send button is clicked
sendButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const avatar = avatarSelect.value;
  const message = messageInput.value.trim();

  if (username !== '' && message !== '') {
    const msgData = { username, avatar, message };
    socket.emit('chat message', msgData);  // Send message to server
    messageInput.value = '';               // Clear the input field
  }
});

// Display incoming messages from server
socket.on('chat message', (msgData) => {
  const messageElement = document.createElement('div');
  
  // Create a user avatar image
  const avatarImage = document.createElement('img');
  avatarImage.src = msgData.avatar;
  avatarImage.style.width = '30px'; // Set width of avatar
  avatarImage.style.height = '30px'; // Set height of avatar
  avatarImage.style.borderRadius = '50%'; // Make it round
  avatarImage.style.marginRight = '10px';

  // Create a message element
  const usernameElement = document.createElement('strong');
  usernameElement.textContent = msgData.username + ': ';
  
  // Append avatar and username to the message element
  messageElement.appendChild(avatarImage);
  messageElement.appendChild(usernameElement);
  messageElement.appendChild(document.createTextNode(msgData.message));
  
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Scroll to bottom
});

// Allow sending messages by pressing "Enter"
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});
