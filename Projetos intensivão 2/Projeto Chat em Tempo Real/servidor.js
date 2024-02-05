const http = require("http");
const express = require("express");
const aplicacao = express();
const porta = 1000;
const ip = "";

const servidorHttp = http.createServer(aplicacao);
const io = require("socket.io")(servidorHttp);

io.addListener("connection", (socket) => {
  console.log("Um novo usuário conectou na sessão!");
  socket.addListener("Nova mensagem", (msg) => {
    io.emit("Nova mensagem", msg);
  });
});

aplicacao.use(express.static("public"));

servidorHttp.listen(porta, ip);
