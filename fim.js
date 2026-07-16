import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "line-heart-bnc.firebaseapp.com",
  projectId: "line-heart-bnc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===================== RANK =====================

function pegarRank(pontos){

  if(pontos >= 2500) return "✨ INDELÉVEL ✨";
  if(pontos >= 2000) return "Princess-Golden";
  if(pontos >= 1000) return "Golden-Girl";
  if(pontos >= 600) return "Crimson-Eyes";
  if(pontos >= 300) return "Pool-love";
  if(pontos >= 150) return "Sunshine";

  return "Social";
}

// ===================== CARREGAR =====================

onAuthStateChanged(auth, async(user)=>{

  if(!user) return;

  const snap = await getDoc(doc(db,"users",user.uid));

  if(!snap.exists()) return;

  const dados = snap.data();

  document.getElementById("nome").innerText =
    dados.nome;

  document.getElementById("pontos").innerText =
    dados.pontosTotal ?? 0;

  document.getElementById("rank").innerText =
    pegarRank(dados.pontosTotal ?? 0);

});

// ===================== CONTADOR =====================

// Data fixa: 15/07/2026 02:14:34
const fim = new Date("2026-07-15T02:14:34");

function atualizarContador(){

  const agora = new Date();

  let diff = fim - agora;

  if(diff < 0) diff = 0;

  const dias =
    Math.floor(diff / 86400000);

  const horas =
    Math.floor(diff % 86400000 / 3600000);

  const minutos =
    Math.floor(diff % 3600000 / 60000);

  const segundos =
    Math.floor(diff % 60000 / 1000);

  document.getElementById("contador").innerHTML =
  `
  ${dias}d
  ${horas}h
  ${minutos}m
  ${segundos}s
  `;

}

setInterval(atualizarContador,1000);

atualizarContador();