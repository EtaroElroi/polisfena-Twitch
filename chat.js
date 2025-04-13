const accessToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNDc5OSIsImp0aSI6IjY0MmJjYmVlNzQ1ZWI5MGJjYzRkY2M3MDhmNDkyY
jgzMWU1Y2U2M2NlNzU0NDM0NmRiN2IxZjY0OTFmNWEwMzExY2U3NWUxZTU4OTBlMzc4IiwiaWF0IjoxNzQ0NTQyODUxLjQzODksIm5iZiI6MTc0NDU0Mjg1MS40
Mzg5LCJleHAiOjE3NzYwNzg4NTEuNDI3OSwic3ViIjoiMjM3NjcyMiIsInNjb3BlcyI6WyJvYXV0aC1kb25hdGlvbi1zdWJzY3JpYmUiLCJvYXV0aC11c2VyLXN
ob3ciXX0.vnRCWWNgRvVKFj3ko_ul2CYBzndy2EjlSVzB1Frgp5vU1ZJ5WQflqxBixE-NLXbsVeHtivjVO0IvvhiWIl7L0x88LkRcC_knGkon3JYZpu-QrA2A7A
uEGyHLRTEHAH85OB0XkbQbwkXa88cXdpDVF7vfg0VpGbRB75pSRW6sB7vQ7kpMdDqyGV8YA-gcxh8PEQa4Em2OXKfYbaPvFvUthekXVEOK4Ra7cNl4u4K4TdB1J
k46jNf_Lb3Sraf7kHBFEVyw8_r5iFYX5fr8naqKqxO_DSza7uh2UGkovceFbgS6LzgRX5w-7EF1OcayXCmHJQxke1Vgp7L9YN354MPuD9m-qMeAJZ8L5YSfrhYi
NHhNmPVqvCMghof70AcSasvo9S8pxDdJqfK7RKblBsIKWN_ynRjTasI1Q-5vglGch6_t2XvoxLz6tyctEZiVUwq_ueJiYLotsb_ijj9cr-bgxQ1M51Z2RXY2NGs
3Z7aavcerWJ-W1D1OhzSzOaRl7xJu9sgs8VPtBpUWm06BpFnJ3URtZ4egWRkJmd2KK614Fndy9gSogpYsrZlcjg8E9WLaag73r_clof7Qf-CYSJa90vbey-XOUw
vVz1wy6HadaMQ-3O-dbRnW1zjNEf2w3R4xOrLD2NHni6U7lSt5BrqrE3Actq0_T2Gk_S5YWow0g5g`;

const socket = new WebSocket(`wss://centrifugo.donationalerts.com/connection/websocket`);

socket.onopen = () => {
  console.log("Соединение установлено.");

  const authMessage = {
    method: "connect",
    params: {
      token: accessToken
    }
  };
  socket.send(JSON.stringify(authMessage));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.result?.channels) {
    console.log("Подписываемся на:", data.result.channels);

    data.result.channels.forEach((channel) => {
      const subscribeMessage = {
        method: "subscribe",
        params: {
          channel,
        },
      };
      socket.send(JSON.stringify(subscribeMessage));
    });
  }

  if (data.method === "publish" && data.params?.data) {
    const message = data.params.data.message;
    if (message) showMessage(message);
  }
};

function showMessage(text) {
  const container = document.getElementById("chat-container");

  const messageElem = document.createElement("div");
  messageElem.classList.add("chat-message");
  messageElem.textContent = text;

  container.appendChild(messageElem);

  // Удаление через 10 секунд
  setTimeout(() => {
    messageElem.remove();
  }, 10000);
}
