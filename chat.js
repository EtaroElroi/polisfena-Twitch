const chatContainer = document.getElementById("chat-container");

const socket = new WebSocket('wss://astro.streamelements.com');

socket.addEventListener('open', () => {
  console.log('WebSocket connected');

  // Отправка сообщения для аутентификации
  socket.send(JSON.stringify({
    type: 'authenticate',
    data: {
      token: CONFIG.TWITCH_JWT_TOKEN
    }
  }));
});

socket.addEventListener('message', (event) => {
  const packet = JSON.parse(event.data);

  // Обработка сообщений чата
  if (packet.type === 'event' && packet.event && packet.event.type === 'message') {
    const { displayName, message } = packet.event.data;

    const msgElement = document.createElement("div");
    msgElement.className = "message";
    msgElement.innerHTML = `<strong>${displayName}:</strong> ${message}`;

    chatContainer.prepend(msgElement);

    // Удаление сообщения через 30 секунд
    setTimeout(() => {
      msgElement.remove();
    }, 30000);
  }
});
