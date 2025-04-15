// Подключение к WebSocket
const socket = io('https://realtime.streamelements.com', {
  transports: ['websocket']
});

// Аутентификация
socket.on('connect', () => {
  socket.emit('authenticate', {
    method: 'jwt',
    token: CONFIG.TWITCH_JWT_TOKEN,
  });
});

socket.on('event', (data) => {
  if (data.type === 'message') {
    const message = data.data;
    const chat = document.querySelector('.chat-messages');
    const msgElement = document.createElement('div');
    msgElement.className = 'message';
    msgElement.innerHTML = `
      <span class="user-name">${message.displayName}</span>
      <span class="text">${message.text}</span>
    `;
    chat.appendChild(msgElement);
  }
});