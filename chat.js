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
  const message = JSON.parse(event.data);
  if (message.type === "event" && message.event && message.event.type === "message") {
    const userMessage = message.event.data.text;
    const username = message.event.data.displayName;

    // 👇 Здесь происходит отрисовка
    displayMessage(username, userMessage);
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