import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// 🔥 CONFIG (mesma do teu login)
const firebaseConfig = {
  apiKey: "AIzaSyBGWMOLsTvJf5kAMaP8uRWwmDn4Lb1dzNw",
  authDomain: "line-heart-bnc.firebaseapp.com",
  projectId: "line-heart-bnc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ================= CARREGAR INFO =================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));

  if (snap.exists()) {
    const dados = snap.data();

    document.getElementById("nome").innerText = dados.nome;
    document.getElementById("email").innerText = dados.email;
    document.getElementById("pontos").innerText = dados.pontos ?? 0;

    const rank = calcularRank(dados.pontosTotal ?? 0);
    document.getElementById("rank").innerText = rank;
  }
});
//CONTADOR
function calcularRank(pontosTotal) {
  if (pontosTotal < 50) return "Iniciante";
  if (pontosTotal < 150) return "Aprendiz";
  if (pontosTotal < 300) return "Guerreiro";
  if (pontosTotal < 600) return "Veterano";
  if (pontosTotal < 1000) return "Elite";
  if (pontosTotal < 2000) return "Lendário";
  return "Indelével ";
}
// ================= LOGOUT =================
window.logout = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};
window.voltar = () => {
  window.location.href = "home.html";
};
window.abrirRanks = () => {
  document.getElementById("rankModal").style.display = "flex";
};

window.fecharRanks = () => {
  document.getElementById("rankModal").style.display = "none";
};