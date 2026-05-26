import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  updateDoc,
  increment,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// ================= FIREBASE =================

const firebaseConfig = {
  apiKey: "AIzaSyBGWMOLsTvJf5kAMaP8uRWwmDn4Lb1dzNw",
  authDomain: "line-heart-bnc.firebaseapp.com",
  projectId: "line-heart-bnc"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

// ================= USUÁRIO =================

let usuarioAtual = null;

onAuthStateChanged(auth, (user) => {

  if (user) {

    usuarioAtual = user;

    console.log("Usuário logado:", user.uid);

  } else {

    usuarioAtual = null;

  }
});

// ================= FRASES =================

const frases = [
"Seu toque espanta qualquer medo 🤍",
"Você é o meu melhor bom dia ☀️",
"Contigo o tempo parece voar ⏳",
"Seu carinho é o melhor remédio 💊",
"Você é o meu porto seguro no caos ⚓",
"Seu riso é a minha música favorita 🎵",
"Você traz cor para os meus dias cinzas 🌈",
"A vida fica mais leve ao seu lado 🍃",
"Você é o meu porto de paz 🌊",
"Seu olhar diz mais que mil palavras 👀",
"Você é a poesia mais linda que já li 📜",
"Seu abraço é o único lugar onde quero estar 🫂",
"Você é o meu detalhe favorito da vida ✨",
"Com você, tudo faz sentido 🌎",
"Seu amor me faz querer ser melhor 🌟",
"Você é o meu pensamento mais bonito 💭",
"Seu sorriso clareia qualquer escuridão 💡",
"Você é a tradução da palavra felicidade 💖",
"Seu jeito único me encanta todos os dias 🌹",
"Você é o meu acalento nas noites frias 🔥",
"Ao seu lado, sinto que posso tudo 💪",
"Você é o meu ponto de equilíbrio ⚖️",
"Seu amor é um presente diário 🎁",
"Você tem o dom de me fazer sorrir 😊",
"Seu carinho recarrega minhas energias 🔋",
"Você é o meu abrigo em dias de chuva 🌧️",
"Seu jeito doce me conquistou por inteiro 🍬",
"Você faz o meu mundo girar mais bonito 🌎",
"Seu olhar tem um brilho único ✨",
"Você é o meu porto de calmaria 🌙",
"Seu abraço resgata a minha paz 🕊️",
"Você é a razão dos meus sorrisos bobos 😍",
"Seu amor é o meu maior tesouro 💎",
"Você transforma qualquer momento simples em algo mágico ✨",
"Seu jeito de cuidar me fascina 💗",
"Você é a minha melhor versão 💘",
"Seu sorriso tem gosto de felicidade 😁",
"Você é o meu aconchego preferido 🏡",
"Seu carinho faz tudo valer a pena 💞",
"Você é a minha maior certeza ❤️",
"Seu abraço é o meu lar 🏠",
"Você ilumina o meu caminho 🌟",
"Seu jeito me prende de um jeito bom 🥰",
"Você é a melodia do meu coração 💓",
"Seu amor me inspira a voar alto 🦅",
"Você deixa tudo mais leve por onde passa 🍃",
"Seu olhar transmite uma paz imensa 🌊",
"Você é o meu raio de esperança ☀️",
"Seu carinho é um cafuné na alma 🤍",
"Você faz meu coração vibrar na frequência certa 🎵",
"Seu sorriso é o meu combustível ⛽",
"Você é a minha metade perfeita 🧩",
"Seu jeito me acalma a alma 🌊",
"Você é o meu motivo para sorrir à toa 😄",
"Seu abraço cura qualquer cansaço 💗",
"Você é a dona do meu coração ❤️",
"Seu amor é a minha maior riqueza 💰",
"Você faz os meus dias brilharem mais ✨",
"Seu olhar me conecta com o que há de melhor 🔮",
"Você é o meu refúgio nos dias difíceis 🫂",
"Seu carinho é puro aconchego 🧸",
"Você deixa a vida com sabor de quero mais 🍓",
"Seu jeito me conquista a cada segundo ⏳",
"Você é a minha paz em meio à tempestade ⚡",
"Seu sorriso tem luz própria 💡",
"Você é o meu destino favorito 📍",
"Seu abraço me faz esquecer o mundo 🌍",
"Você é a estrela mais brilhante do meu céu ⭐",
"Seu amor é a minha doce rotina 🍬",
"Você faz meu coração bater no ritmo do amor 💓",
"Seu jeito é o meu encaixe perfeito 🤝",
"Você é a minha calmaria no fim do dia 🌙",
"Seu carinho me faz sentir especial 🌹",
"Você é o meu pensamento mais constante 💭",
"Seu olhar me desarmou desde o primeiro dia 👀",
"Você é a melhor parte das minhas lembranças 📸",
"Seu sorriso é um abraço para a alma 😊",
"Você é o meu porto de felicidade ⚓",
"Seu amor traz leveza para a minha vida 🍃",
"Você faz tudo parecer tão simples e lindo 🌸",
"Seu jeito me inspira a amar mais 💕",
"Você é o meu sol em dias nublados ☀️",
"Seu abraço tem cheiro de casa 🏡",
"Você é o meu porto seguro favorito 🤍",
"Seu carinho transforma o meu dia ☀️",
"Você é a minha melhor companhia de sempre 🥰",
"Seu sorriso me salva de qualquer dia ruim 😍",
"Você é o meu maior motivo de orgulho 🥇",
"Seu amor é a melodia mais doce 🎶",
"Você faz o meu coração sorrir de verdade 💓",
"Seu jeito me fascina por completo ✨",
"Você é a minha calmaria no caos diário 🌊",
"Seu olhar tem um segredo que me encanta 👀",
"Você é o meu melhor momento do dia ⏳",
"Seu abraço é um escudo contra o mundo 🛡️",
"Você faz a vida ter mais sentido 🌎",
"Seu carinho acalma o meu coração agitado ❤️",
"Você é a minha resposta para todas as perguntas 💬",
"Seu sorriso é a minha maior inspiração 🌟",
"Você é simplesmente tudo o que eu sempre quis 💖",
"Seu amor me faz sentir flutuar 🎈",
"Você é o meu cais seguro ⚓",
"Seu jeito de sorrir me desmonta inteiro 😍",
"Você deixa os meus dias mais coloridos 🎨",
"Seu carinho é o meu porto de paz 🌊",
"Você é o meu dengo favorito 🤍",
"Seu abraço é o melhor lugar do mundo 🌍",
"Você é a minha dose diária de felicidade 💊",
"Seu olhar me traz uma paz inexplicável 👀",
"Você faz meu coração transbordar de amor 💓",
"Seu jeito meigo me encanta tanto 🌸",
"Você é a minha pessoa no mundo 🌎",
"Seu sorriso é como um raio de sol matinal ☀️",
"Você transforma pequenos gestos em grandes memórias 📸",
"Seu amor é a minha maior força 💪",
"Você é o meu pensamento preferido antes de dormir 🌙",
"Seu carinho faz milagres no meu humor 😊",
"Você é o meu porto de abrigo 🫂",
"Seu jeito único me faz te amar mais ✨",
"Você deixa a vida com mais sabor 🍯",
"Seu abraço me reconecta comigo mesmo 🏠",
"Você é a minha estrela guia 🌟",
"Seu sorriso alegra toda a minha semana 😁",
"Você é o meu porto de tranquilidade 🌊",
"Seu carinho é o que me mantém firme 💕",
"Você faz o meu coração dançar de alegria 🎵",
"Seu olhar me transmite tanta segurança 🛡️",
"Você é o meu refúgio de paz ☁️",
"Seu jeito simples é o que te faz perfeita 🌹",
"Você é o meu melhor capítulo da vida 📖",
"Seu amor é a calmaria que eu precisava 🍃",
"Você deixa tudo mais bonito por onde passa 🌸",
"Seu abraço é o meu esconderijo favorito 🤍",
"Você é a minha melhor escolha todos os dias 💘",
"Seu sorriso é o meu ponto fraco 😍",
"Você faz meu mundo ser um lugar melhor 🌎",
"Seu carinho me envolve de um jeito mágico ✨",
"Você é o meu trevo de quatro folhas 🍀",
"Seu olhar me faz perder o rumo e achar o destino 🗺️",
"Você é o meu aconchego em dias frios 🔥",
"Seu amor me preenche por completo ❤️",
"Você é a minha doçura favorita 🍬",
"Seu jeito atencioso me apaixona sempre 💓",
"Você deixa os meus pensamentos mais leves 🍃",
"Seu abraço é a tradução de conforto 🫂",
"Você é a minha maior fonte de inspiração 🌟",
"Seu sorriso é o meu prêmio diário 🥇",
"Você faz meu coração bater mais forte e feliz 💖",
"Seu carinho é o meu refúgio sagrado 🤍",
"Você é a melhor companhia para qualquer hora ⏳",
"Seu olhar brilha mais que o próprio sol ☀️",
"Você traz paz para os meus dias mais loucos 🌊",
"Seu jeito de me olhar me diz tudo 👀",
"Você é o meu pedacinho de céu na terra ☁️",
"Seu amor é a minha maior certeza na vida 💎",
"Você faz tudo valer a pena com apenas um sorriso 😊",
"Seu abraço me devolve a calma que o mundo tira 🕊️",
"Você é a minha melhor descoberta 🔎",
"Seu carinho me faz flutuar de felicidade 🎈",
"Você deixa a minha alma em paz 🍃",
"Seu jeito descontraído me faz tão bem 😄",
"Você é o meu raio de luz diário 💡",
"Seu sorriso cura qualquer dia cinzento 🌈",
"Você é o meu porto de ternura ⚓",
"Seu amor me envolve como um manto morno 🔥",
"Você faz meu coração bater em festa 🥳",
"Seu olhar me traz um conforto sem fim 🤍",
"Você é o meu aconchego preferido no mundo 🏠",
"Seu carinho é o meu melhor cafuné 💗",
"Você deixa a vida mais leve e bonita 🌸",
"Seu jeito carinhoso me desarma inteiro 🥰",
"Você é a minha maior felicidade 💖",
"Seu abraço é o meu lugar de paz 🌊",
"Você faz os meus dias terem mais sentido 🌎",
"Seu sorriso é o meu combustível para vencer 🚀",
"Você é a minha melhor definição de amor ❤️",
"Seu olhar me faz acreditar no futuro 🌟",
"Você é o meu ponto de calmaria no caos 🌪️",
"Seu carinho é o que me faz sorrir sem perceber 😁",
"Você deixa tudo mais especial ao seu redor ✨",
"Seu jeito me cativa cada vez mais 💞",
"Você é o meu porto de abrigo favorito 🫂",
"Seu amor é o meu maior presente 🎁",
"Você faz o meu coração errar as batidas 💓",
"Seu abraço me traz uma segurança sem igual 🛡️",
"Você é a minha estrela no meio da noite 🌙",
"Seu sorriso me ilumina por inteiro ☀️",
"Você deixa a minha vida muito mais doce 🍬",
"Seu carinho é a minha maior riqueza 💎",
"Você é o meu cais ⚓",
"Seu olhar me transmite uma doçura sem fim 🌸",
"Você faz com que eu me sinta completo 🫂",
"Seu jeito é o meu encaixe mais bonito 🧩",
"Você é a minha melhor certeza no amanhã 🔮",
"Seu abraço é o meu ponto de paz diário 🤍",
"Você traz equilíbrio para o meu mundo ⚖️",
"Seu sorriso me faz esquecer dos problemas 😊",
"Você é o meu amor para todas as horas ⏳",
"Seu carinho é o meu bálsamo de paz 🍃",
"Você deixa tudo mais bonito só de existir ✨",

];

// ================= FRASE TOPO =================

function atualizarFrase() {

  const frase =
    document.getElementById("frase");

  if (!frase) return;

  const dia =
    new Date().getDate();

  frase.innerText =
    frases[dia % frases.length];
}

// ================= ABRIR CARTA =================

window.abrirCarta = async function () {

  const carta =
    document.querySelector(".carta");

  if (!carta) return;

  if (carta.classList.contains("aberta"))
    return;

  carta.classList.add("aberta");

  const hoje =
    new Date().toDateString();

  const ultimaCarta =
    localStorage.getItem("ultimaCarta");

  const mensagemEl =
    document.getElementById("mensagemCarta");

  const pontosEl =
    document.getElementById("pontosCarta");

  if (hoje === ultimaCarta) {

    if (pontosEl)
      pontosEl.innerText =
        "Já abriu hoje 😏";

    return;
  }

  if (!usuarioAtual) {

    alert("Faça login primeiro");

    return;
  }

  try {

    const userRef =
      doc(
        db,
        "users",
        usuarioAtual.uid
      );

    let mensagem = "";

    let pontosGanhos = 0;

    let rankEspecial = false;

    // ================= CHANCE RARA =================

    const chanceRara =
      Math.floor(Math.random() * 1000);

    if (chanceRara === 777) {

      mensagem =
        "✨ VOCÊ É INDELÉVEL ✨";

      pontosGanhos = 15;

      rankEspecial = true;

      await updateDoc(userRef, {

        pontos:
          increment(pontosGanhos),

        pontosTotal:
          increment(pontosGanhos),

        rankEspecial:
          "INDELÉVEL"

      });

    } else {

      mensagem =

        frases[
          Math.floor(
            Math.random() * frases.length
          )
        ];

      pontosGanhos =
        Math.floor(Math.random() * 11) + 5;

      await updateDoc(userRef, {

        pontos:
          increment(pontosGanhos),

        pontosTotal:
          increment(pontosGanhos)

      });

    }

    localStorage.setItem(
      "ultimaCarta",
      hoje
    );

    if (mensagemEl)
      mensagemEl.innerText =
        mensagem;

    if (pontosEl) {

      pontosEl.innerText =

        rankEspecial

          ? `💎 RANK INDELÉVEL LIBERADO`

          : `+${pontosGanhos} pontos 💖`;
    }

  } catch (erro) {

    console.log(erro);

    alert("Erro ao adicionar pontos");

  }
};

// ================= RESGATAR CÓDIGO =================

window.resgatarCodigo =
  async function () {

  const input =
    document.getElementById(
      "codigoInput"
    );

  const msg =
    document.getElementById(
      "msgCodigo"
    );

  if (!input || !msg)
    return;

  const codigo =
    input.value
      .trim()
      .toUpperCase();

  if (!usuarioAtual) {

    msg.innerText =
      "Faça login primeiro";

    msg.style.color =
      "red";

    return;
  }

  // ================= CÓDIGOS =================

  const codigos = {

    "250326": 120,
    "GOLDSMILE": 300,
    "CORACAO": 50,
    "SORRY": 50,
    "143": 143,
    "AMOR": 10,
    "HEARTLINE": 50,
    "BLOFMBLO": 2500

  };

  // ================= INVÁLIDO =================

  if (!codigos[codigo]) {

    msg.innerText =
      "❌ Código inválido";

    msg.style.color =
      "red";

    return;
  }

  try {

    const codigoRef =
      doc(
        db,
        "codigosUsados",
        `${usuarioAtual.uid}_${codigo}`
      );

    const snap =
      await getDoc(codigoRef);

    if (snap.exists()) {

      msg.innerText =
        "⚠️ Código já usado";

      msg.style.color =
        "orange";

      return;
    }

    const pontos =
      codigos[codigo];

    const userRef =
      doc(
        db,
        "users",
        usuarioAtual.uid
      );

    // ================= BLOFMBLO =================

    if (codigo === "BLOFMBLO") {

      await updateDoc(userRef, {

        pontos:
          increment(pontos),

        pontosTotal:
          increment(pontos),

        rankEspecial:
          "INDELÉVEL"

      });

    } else {

      await updateDoc(userRef, {

        pontos:
          increment(pontos),

        pontosTotal:
          increment(pontos)

      });

    }

    // ================= SALVAR USO =================

    await setDoc(codigoRef, {

      codigo,
      pontos,
      uid: usuarioAtual.uid

    });

    msg.innerText =
      `🎉 +${pontos} pontos adicionados!`;

    msg.style.color =
      "lime";

    input.value = "";

  } catch (erro) {

    console.log(erro);

    msg.innerText =
      "Erro ao resgatar";

    msg.style.color =
      "red";
  }
};

// ================= INIT =================

window.onload = () => {

  atualizarFrase();

};