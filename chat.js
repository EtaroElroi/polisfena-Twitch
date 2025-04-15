// Убедитесь, что класс контейнера совпадает
const chatContainer = document.querySelector(".chat-messages");


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

// Пример обработки сообщения
socket.on("event", (data) => {
  if (data.type === "message") {
    const message = data.data;
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.innerHTML = `
      <span class="user">${message.displayName}:</span>
      <span class="text">${message.text}</span>
    `;
    chatContainer.appendChild(messageElement);
  }
});