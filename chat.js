// Подключаемся к Twitch
const client = new tmi.Client({
    connection: { secure: true, reconnect: true },
    channels: ["ТWhiteEls"] // Замени на свой ник!
});

client.connect();

// Контейнер для сообщений
const chatContainer = document.getElementById("chat-container");

client.on("message", (channel, tags, message, self) => {
    if (self) return;
    
    const chatMessage = document.createElement("div");
    chatMessage.classList.add("message");
    chatMessage.innerHTML = `<strong>${tags["display-name"]}:</strong> ${message}`;
    
    chatContainer.appendChild(chatMessage);

    // Удаляем сообщение через 9 секунд
    setTimeout(() => chatMessage.remove(), 9000);
});
