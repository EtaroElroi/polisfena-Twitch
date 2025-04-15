const chat = document.getElementById("chat");

const socket = new WebSocket("wss://astro.streamelements.com");

socket.addEventListener("open", () => {
  console.log("Twitch WebSocket подключен");

  socket.send(JSON.stringify({
    type: "authenticate",
    data: { token: CONFIG.TWITCH_JWT_TOKEN }
  }));
});

socket.addEventListener("message", (event) => {
  try {
    const data = JSON.parse(event.data);
    if (data.type === "event" && data.event.type === "message") {
      const msg = data.event.data;
      const username = msg.displayName;
      const text = msg.text;

      const isReward = msg["custom-reward-id"];

      displayMessage(username, text, isReward);
    }
  } catch (e) {
    console.error("Ошибка в сообщении:", e);
  }
});

function displayMessage(username, text, isReward = false) {
  const msgEl = document.createElement("div");
  msgEl.classList.add("message");
  if (isReward) msgEl.classList.add("reward");

  msgEl.innerHTML = `
    <span class="username">${username}:</span>
    <span class="text">${text}</span>
  `;

  chat.appendChild(msgEl);
  chat.scrollTop = chat.scrollHeight;
}
