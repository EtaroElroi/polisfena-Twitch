const daSocket = new WebSocket(`wss://socket.donationalerts.ru/v1/ws/${CONFIG.DA_ACCESS_TOKEN}`);

daSocket.addEventListener("open", () => {
  console.log("Подключено к DonationAlerts");
});

daSocket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  if (data.event === "donation") {
    const { username, message } = data.data;
    displayAlert(username, message);
  }
});

function displayAlert(username, message) {
  const msgEl = document.createElement("div");
  msgEl.classList.add("message", "donation");

  msgEl.innerHTML = `
    <span class="username">${username} (^o^):</span>
    <span class="text">${message}</span>
  `;

  chat.appendChild(msgEl);
  chat.scrollTop = chat.scrollHeight;
}
