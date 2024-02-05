const botaoEnviar = document.getElementById("enviar");
const caixaMensagem = document.getElementById("texto");
const chat = document.getElementById("mensagens");

const socket = io();

botaoEnviar.addEventListener("click", () => {
  if (caixaMensagem.value !== "") {
    socket.emit("Nova mensagem", caixaMensagem.value);
    caixaMensagem.value = "";
  }
});

socket.addEventListener("Nova mensagem", (msg) => {
  const elementoMensagem = document.createElement("li");
  elementoMensagem.textContent = msg;
  elementoMensagem.classList.add("mensagem");
  chat.appendChild(elementoMensagem);
});
