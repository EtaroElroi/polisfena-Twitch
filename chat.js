const client = new tmi.Client({
    connection: { secure: true, reconnect: true },
    channels: [TWITCH_CHANNEL],
  });
  
  client.connect();
  
  client.on("message", (channel, tags, message) => {
    const chatBox = document.getElementById("chat");
    const el = document.createElement("div");
    el.className = "message";
    el.innerHTML = `<span class="username">${tags["display-name"]}:</span> ${message}`;
    chatBox.appendChild(el);
    // удаление сообщений через 15 секунд
    setTimeout(() => el.remove(), 15000);
  });