const channelName = "whiteels";
const chat = document.getElementById("chat-container");

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

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "event" && data.data && data.data.message) {
    const msg = data.data.message;
    const username = msg.tags['displayName'];
    const userMessage = msg.text;

    const isHighlighted = !!msg.tags['custom-reward-id']; // true, если юзер использует баллы канала

    displayMessage(username, userMessage, isHighlighted);
  }
});

// Функция для отображения сообщений в HTML
function displayMessage(username, message) {
  console.log("📨 Новое сообщение от", username, ":", userMessage);

  const chat = document.getElementById("chat");

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  // Пример: если сообщение содержит "!highlight", оно окрашивается в другой цвет
  const isHighlighted = message.includes("!highlight");

  messageElement.innerHTML = `
    <span class="username">${username}:</span>
    <span class="text ${isHighlighted ? "highlight" : ""}">${message}</span>
  `;

  chat.appendChild(messageElement);
  chat.scrollTop = chat.scrollHeight;
}