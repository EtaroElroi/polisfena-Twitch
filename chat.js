const client = new tmi.Client({
    connection: { secure: true, reconnect: true },
    channels: ["WhiteEls"] // Замени на свой канал
});

client.connect();

const chatContainer = document.getElementById("chat-container");

client.on("message", (channel, tags, message, self) => {
    if (self) return;
    
    const chatMessage = document.createElement("div");
    chatMessage.classList.add("message");
    chatMessage.innerHTML = `<strong>${tags["display-name"]}:</strong> ${message}`;
    chatContainer.appendChild(chatMessage);

    setTimeout(() => chatMessage.remove(), 9000); // Удаляем через 9 секунд
});
