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
  "Seu sorriso ilumina meu dia ☀️",
  "Você é meu lugar favorito 🏡",
  "Tudo fica melhor com você ✨",
  "Você faz meu coração acelerar ❤️",
  "Seu abraço é meu refúgio 🤍",
  "Você é meu pensamento favorito 💭",
  "Te ver feliz me faz feliz 😊",
  "Você deixa meus dias leves 🍃",
  "Seu olhar me prende fácil 👀",
  "Você é incrível sem esforço 🌹",
  "Meu dia melhora quando falo com você 📱",
  "Você é especial demais pra mim 💖",
  "Seu jeito me encanta ✨",
  "Você é minha calmaria 🌙",
  "Tudo em você é bonito 🌸",
  "Você vale mais do que imagina 💎",
  "Seu carinho muda tudo 🫶",
  "Você me faz sorrir atoa 😍",
  "Você é minha melhor escolha 💘",
  "Seu amor faz diferença 💞",
  "Você é meu porto seguro ⚓",
  "Seu jeito é viciante 🔥",
  "Você é linda por dentro e fora 🌷",
  "Meu coração gosta de você demais ❤️",
  "Você deixa tudo mais colorido 🌈",
  "Seu abraço parece casa 🏠",
  "Você é a parte boa do meu dia ☀️",
  "Com você tudo fica leve 🍃",
  "Seu sorriso é perfeito 😁",
  "Você é minha pessoa favorita 💕",
  "Seu amor vale ouro 🥇",
  "Você me faz sentir completo 🫂",
  "Você é meu cantinho de paz 🌙",
  "Nada supera seu carinho 💗",
  "Você é simplesmente incrível ✨",
  "Seu jeito me acalma 🌊",
  "Você faz meu coração sorrir 💓",
  "Você é doce sem tentar 🍬",
  "Você faz a vida valer mais 🌎",
  "Seu amor é meu favorito 💞",
  "Você merece o mundo inteiro 🌍",
  "Seu toque é especial 🤲",
  "Você ilumina minha mente 💡",
  "Você me inspira todos os dias 🌟",
  "Seu sorriso é mágico ✨",
  "Você deixa tudo mais bonito 🌸",
  "Você é única pra mim 💘",
  "Seu amor me fortalece 💪",
  "Você é meu sonho favorito 🌙",
  "Tudo em você me encanta 🥰",
  "Você faz meu mundo melhor 🌎",
  "Seu carinho vale muito 💗",
  "Você é a melhor parte do dia ☀️",
  "Seu olhar transmite paz 🌊",
  "Você é meu motivo de sorrir 😊",
  "Você é perfeita do seu jeito 🌹",
  "Seu amor é raro 💎",
  "Você transforma meus dias ✨",
  "Você é mais importante do que imagina 💖",
  "Seu sorriso me desmonta 😍",
  "Você é meu acaso favorito 🍀",
  "Você faz tudo valer a pena 💞",
  "Seu coração é lindo ❤️",
  "Você me faz sentir amado 🫂",
  "Seu jeito é inesquecível 🌟",
  "Você é meu conforto 🤍",
  "Você é a paz no meu caos 🌙",
  "Seu amor me acalma 🌊",
  "Você deixa tudo especial ✨",
  "Você é minha felicidade favorita 😊",
  "Seu abraço cura tudo 💕",
  "Você é importante demais 💎",
  "Seu sorriso me ganha fácil 😁",
  "Você é meu presente favorito 🎁",
  "Você deixa a vida mais bonita 🌸",
  "Seu carinho faz diferença 💞",
  "Você é meu melhor sentimento ❤️",
  "Você é inesquecível 🌟",
  "Seu jeito me prende 💘",
  "Você é meu ponto de paz ☁️",
  "Você vale cada sorriso 😊",
  "Seu amor aquece meu coração 🔥",
  "Você faz meu mundo sorrir 🌎",
  "Você é meu pensamento diário 💭",
  "Seu abraço tem magia ✨",
  "Você faz meu coração feliz 💓",
  "Você é meu lugar seguro 🏡",
  "Seu jeito é precioso 💎",
  "Você é meu melhor acaso 🍀",
  "Seu amor é minha paz 🌙",
  "Você deixa tudo mais leve 🍃",
  "Você é minha parte favorita 💕",
  "Seu sorriso vale ouro 🥇",
  "Você é meu raio de sol ☀️",
  "Seu amor é meu abrigo 🫂",
  "Você é meu maior carinho 💖",
  "Seu olhar me tranquiliza 🌊",
  "Você é minha melhor companhia 🥰",
  "Você faz meu coração vibrar 💓",
  "Seu amor é tudo pra mim ❤️"
];

// ================= FRASE DO TOPO =================

function atualizarFrase() {

  const frase =
    document.getElementById("frase");

  if (!frase) return;

  const dia =
    new Date().getDate();

  frase.innerText =
    frases[dia % frases.length];
}

// ================= CARTA =================

window.abrirCarta = async function () {

  const carta =
    document.querySelector(".carta");

  if (!carta) return;

  // impede abrir várias vezes
  if (carta.classList.contains("aberta"))
    return;

  carta.classList.add("aberta");

  const hoje =
    new Date().toDateString();

  const ultimaCarta =
    localStorage.getItem("ultimaCarta");

  let mensagem = "";
  let pontosGanhos = 0;

  // ================= GANHAR PONTOS =================

  if (hoje !== ultimaCarta) {

    if (!usuarioAtual) {

      alert("Usuário não carregado");

      return;
    }

    try {

      const userRef =
        doc(
          db,
          "users",
          usuarioAtual.uid
        );

      // ================= CHANCE RARA =================

      const chanceRara =
        Math.floor(Math.random() * 1000);

      let rankEspecial = false;

      // 1 chance em 1000
      if (chanceRara === 777) {

        mensagem =
          "✨ você é INDELÉVEL ✨";

        pontosGanhos = 15;

        rankEspecial = true;

        // salva rank especial
        await updateDoc(userRef, {

          pontos:
            increment(pontosGanhos),

          pontosTotal:
            increment(pontosGanhos),

          rankEspecial:
            "✨ VOCÊ É INDELÉVEL ✨"

        });

      } else {

        // ================= FRASE NORMAL =================

        mensagem =

          frases[
            Math.floor(
              Math.random() * frases.length
            )
          ];

        // pontos aleatórios
        pontosGanhos =
          Math.floor(Math.random() * 11) + 5;

        // soma pontos
        await updateDoc(userRef, {

          pontos:
            increment(pontosGanhos),

          pontosTotal:
            increment(pontosGanhos)

        });
      }

      console.log(
        "Pontos adicionados:",
        pontosGanhos
      );

      // salva data
      localStorage.setItem(
        "ultimaCarta",
        hoje
      );

      // ================= MOSTRAR CARTA =================

      const mensagemEl =
        document.getElementById(
          "mensagemCarta"
        );

      const pontosEl =
        document.getElementById(
          "pontosCarta"
        );

      if (mensagemEl)
        mensagemEl.innerText =
          mensagem;

      if (pontosEl) {

        pontosEl.innerText =

          rankEspecial

            ? `+15 pontos 💎 RANK INDELÉVEL LIBERADO`

            : `+${pontosGanhos} pontos 💖`;
      }

    } catch (erro) {

      console.log(erro);

      alert(
        "Erro ao adicionar pontos"
      );
    }

  } else {

    // ================= JÁ ABRIU =================

    const pontosEl =
      document.getElementById(
        "pontosCarta"
      );

    if (pontosEl)
      pontosEl.innerText =
        "Já abriu hoje 😏";
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

  // usuário carregado?
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
  "2020": 55,
  "LOVE": 20,
  "K&J": 75,
  // 🔥 rank máximo
  "BLOODOFMYBLOOD": 2500

};

  // código inválido
  if (!codigos[codigo]) {

    msg.innerText =
      "❌ Código inválido";

    msg.style.color =
      "red";

    return;
  }

  try {

    // documento único
    const codigoRef =
      doc(
        db,
        "codigosUsados",
        `${usuarioAtual.uid}_${codigo}`
      );

    // verifica se já usou
    const snap =
      await getDoc(codigoRef);

    if (snap.exists()) {

      msg.innerText =
        "⚠️ Código já usado";

      msg.style.color =
        "orange";

      return;
    }

    // pontos do código
    const pontos =
      codigos[codigo];

    // soma pontos
    await updateDoc(
      doc(db, "users", usuarioAtual.uid),
      {

        pontos:
          increment(pontos),

        pontosTotal:
          increment(pontos)

      }
    );

    // salva uso
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
