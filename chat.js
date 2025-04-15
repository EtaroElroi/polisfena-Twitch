const chatContainer = document.getElementById("chat-container");

const socket = new WebSocket(`wss://realtime.streamelements.com/socket.io/?transport=websocket`);

socket.addEventListener('open', () => {
  console.log("WebSocket connected");
  socket.send(JSON.stringify({
    type: 'authenticate',
    data: {
      token: TWITCH_JWT_TOKEN
    }
  }));
});

socket.addEventListener('message', (event) => {
  const packet = JSON.parse(event.data);

  if (packet.type === 'event' && packet.event && packet.event.type === 'message') {
    const { displayName, message } = packet.event.data;

    const msgElement = document.createElement("div");
    msgElement.className = "message";
    msgElement.innerHTML = `<strong>${displayName}:</strong> ${message}`;

    chatContainer.prepend(msgElement);
    
  }
});
