// ================= CARTA =================

function abrirCarta() {
  const carta = document.querySelector(".carta");

  const hoje = new Date().toDateString();
  const ultimo = localStorage.getItem("ultimaCarta");

  if (carta.classList.contains("aberta")) return;

  carta.classList.add("aberta");

  const mensagens = [
    "Você é meu mundo 💖",
    "Te amo mais que tudo ❤️",
    "Você é minha felicidade ✨",
    "Meu coração é seu 💫",
    "Sempre você 💕"
  ];

  const msg = mensagens[Math.floor(Math.random() * mensagens.length)];

  let pontosGanhos = 0;

  if (hoje !== ultimo) {
    pontosGanhos = Math.floor(Math.random() * 11) + 5;

    let pontos = parseInt(localStorage.getItem("pontos")) || 0;
    pontos += pontosGanhos;

    localStorage.setItem("pontos", pontos);
    localStorage.setItem("ultimaCarta", hoje);
  }

  document.getElementById("mensagemCarta").innerText = msg;
  document.getElementById("pontosCarta").innerText =
    pontosGanhos > 0 ? `+${pontosGanhos} pontos 💖` : "Já abriu hoje 😏";
}

// ================= FRASES =================

function atualizarFrase() {
  const frases = [
    "Você é meu sonho realizado 💖",
    "Te amo mais a cada dia ❤️",
    "Com você tudo faz sentido ✨",
    "Nosso amor é infinito 💫",
    "Você é meu melhor acaso 🌹",
    "Cada momento contigo é especial 🫶",
    "Você é meu lugar favorito 🏡"
  ];

  const dia = new Date().getDate();
  document.getElementById("frase").innerText =
    frases[dia % frases.length];
}
