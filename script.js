const socket = io('https://special-garnet-bone.glitch.me/');
;
socket.on('connect', () => {
    console.log('Connected to the server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

const usernameInput = document.getElementById('username');
const avatarSelect = document.getElementById('avatarSelect');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('messages');

sendButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const avatar = avatarSelect.value;
  const message = messageInput.value.trim();

  if (username !== '' && message !== '') {
    const msgData = { username, avatar, message };
    socket.emit('chat message', msgData);
    messageInput.value = '';              
  }
});

socket.on('chat message', (msgData) => {
  const messageElement = document.createElement('div');
  
  const avatarImage = document.createElement('img');
  avatarImage.src = msgData.avatar;
  avatarImage.style.width = '30px'; 
  avatarImage.style.height = '30px'; 
  avatarImage.style.borderRadius = '50%';
  avatarImage.style.marginRight = '10px';

  const usernameElement = document.createElement('strong');
  usernameElement.textContent = msgData.username + ': ';
  
  messageElement.appendChild(avatarImage);
  messageElement.appendChild(usernameElement);
  messageElement.appendChild(document.createTextNode(msgData.message));
  
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; 
});

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});
