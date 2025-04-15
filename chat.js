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

// Обработка сообщений
socket.on('event', (data) => {
  if (data.type === 'message') {
    const message = data.data;
    const chatContainer = document.querySelector('.chat-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.displayName}: ${message.text}`;
    chatContainer.appendChild(messageElement);
  }
});