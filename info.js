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

// ================= FIREBASE =================

const firebaseConfig = {
  apiKey: "AIzaSyBGWMOLsTvJf5kAMaP8uRWwmDn4Lb1dzNw",
  authDomain: "line-heart-bnc.firebaseapp.com",
  projectId: "line-heart-bnc"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

// ================= CARREGAR USUÁRIO =================

onAuthStateChanged(auth, async (user) => {

  // sem login
  if (!user) {

    window.location.href = "login.html";

    return;
  }

  try {

    const userRef =
      doc(db, "users", user.uid);

    const snap =
      await getDoc(userRef);

    if (snap.exists()) {

      const dados =
        snap.data();

      // elementos
      const nomeEl =
        document.getElementById("nome");

      const emailEl =
        document.getElementById("email");

      const pontosEl =
        document.getElementById("pontos");

      const totalEl =
        document.getElementById("pontosTotal");

      const rankEl =
        document.getElementById("rank");

      // valores
      const pontos =
        dados.pontos ?? 0;

      const pontosTotal =
        dados.pontosTotal ?? 0;

      const rankEspecial =
        dados.rankEspecial ?? null;

      // mostra na tela
      if (nomeEl)
        nomeEl.innerText =
          dados.nome;

      if (emailEl)
        emailEl.innerText =
          dados.email;

      if (pontosEl)
        pontosEl.innerText =
          pontos;

      if (totalEl)
        totalEl.innerText =
          pontosTotal;

      // ================= RANK =================

      let rank = "";

      // rank raro
      if (rankEspecial === "INDELÉVEL") {

        rank =
          "INDELÉVEL 💎";

      } else {

        // rank normal
        rank =
          calcularRank(pontosTotal);
      }

      if (rankEl)
        rankEl.innerText =
          rank;
    }

  } catch (erro) {

    console.log(erro);

    alert("Erro ao carregar usuário");
  }
});

// ================= SISTEMA DE RANK =================

function calcularRank(pontosTotal) {

  if (pontosTotal < 50)
    return "Social";

  if (pontosTotal < 150)
    return "Sunshine";

  if (pontosTotal < 300)
    return "Pool-love";

  if (pontosTotal < 600)
    return "Namorada";

  if (pontosTotal < 1000)
    return "Golden-GirlFriend";

  if (pontosTotal < 2000)
    return "Princess-Golden";

  return "✨INDELÉVEL✨";
}

// ================= LOGOUT =================

window.logout = async function () {

  await signOut(auth);

  window.location.href =
    "login.html";
};

// ================= VOLTAR =================

window.voltar = function () {

  window.location.href =
    "home.html";
};

// ================= MODAL RANK =================

window.abrirRanks = function () {

  const modal =
    document.getElementById("rankModal");

  if (modal)
    modal.style.display = "flex";
};

window.fecharRanks = function () {

  const modal =
    document.getElementById("rankModal");

  if (modal)
    modal.style.display = "none";
};