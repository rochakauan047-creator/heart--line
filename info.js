// 🔒 PROTEGER PÁGINA
const usuario = localStorage.getItem("usuario");

if (!usuario) {
  window.location.href = "index.html";
}

// CARREGAR DADOS
function carregarUsuario() {
  const nome = localStorage.getItem("usuario");
  const pontos = parseInt(localStorage.getItem("pontos")) || 0;

  document.getElementById("usuario").innerText = nome;
  document.getElementById("pontos").innerText = pontos;

  calcularNivel(pontos);
}
// GANHAR PONTO (1x por dia)
function ganharPonto() {
  const hoje = new Date().toDateString();
  const ultimo = localStorage.getItem("ultimoDia");

  if (hoje !== ultimo) {
    let pontos = parseInt(localStorage.getItem("pontos")) || 0;

    pontos += 10;

    localStorage.setItem("pontos", pontos);
    localStorage.setItem("ultimoDia", hoje);

    alert("+10 pontos 💖");
  } else {
    alert("Já ganhou hoje 😏");
  }

  carregarUsuario();
}

//  NÍVEL DO AMOR
function calcularNivel(pontos) {
  let msg = "";

  if (pontos < 50) msg = "Início do nosso amor 💕";
  else if (pontos < 100) msg = "Amor crescendo 🌱";
  else if (pontos < 200) msg = "Apaixonados 💖";
  else msg = "Amor infinito 💀💘";

  document.getElementById("mensagem").innerText = msg;
}

// SAIR
function sair() {
  localStorage.removeItem("usuario");
  localStorage.removeItem("senha");
  window.location.href = "home.html";
}
//VOLTAR
function voltar() {
  window.history.back();
}
// INICIAR
window.onload = carregarUsuario;