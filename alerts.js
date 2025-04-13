const socket = new WebSocket(`wss://socket.donationalerts.ru:443/?token=${DONATIONALERTS_TOKEN}`);

socket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  if (data.event === "donation") {
    const chatBox = document.getElementById("chat");
    const el = document.createElement("div");
    el.className = "message donation";
    el.innerHTML = `<span class="username">[DONATE]</span> ${data.data.message}`;
    chatBox.appendChild(el);
    setTimeout(() => el.remove(), 15000);
  }
};