// chat.js
import { STREAM_ELEMENTS_JWT } from "./config.js";

const socket = new WebSocket(`wss://realtime.streamelements.com/socket.io/?transport=websocket`);

socket.addEventListener("open", () => {
  console.log("WebSocket StreamElements подключён");

  // Авторизация
  socket.send(JSON.stringify({
    event: "authenticate",
    data: {
      method: "jwt",
      token: STREAM_ELEMENTS_JWT
    }
  }));
});

socket.addEventListener("message", (event) => {
  const { event: type, data } = JSON.parse(event.data);

  if (type === "event" && data.listener === "message") {
    const { name, message } = data.event;
    addMessageToChat(name, message);
  }
});

function addMessageToChat(username, message) {
  const chatBox = document.getElementById("chat");
  const messageEl = document.createElement("div");
  messageEl.className = "chat-message";
  messageEl.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatBox.appendChild(messageEl);

  // Анимация появления и удаления
  messageEl.style.animation = "fadeIn 0.5s ease-out, fadeOut 0.5s ease-in 10s forwards";
}
