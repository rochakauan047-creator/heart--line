import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
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

// ================= USUÁRIO =================

let usuarioAtual = null;

onAuthStateChanged(auth, (user) => {

  if (user) {

    usuarioAtual = user;

    carregarNotas();

  } else {

    window.location.href = "login.html";

  }
});

// ================= ADICIONAR NOTA =================

window.adicionarNota = async function () {

  const input =
    document.getElementById("textoNota");

  if (!input) return;

  const texto =
    input.value.trim();

  if (!texto) return;

  try {

    // pega dados do usuário
    const userDoc =
      await getDoc(
        doc(db, "users", usuarioAtual.uid)
      );

    let nomeUsuario = "Usuário";

    if (userDoc.exists()) {

      nomeUsuario =
        userDoc.data().nome;

    }

    // salva nota
    await addDoc(
      collection(db, "notas"),
      {

        texto: texto,

        uid: usuarioAtual.uid,

        nome: nomeUsuario,

        data: serverTimestamp()

      }
    );

    input.value = "";

    carregarNotas();

  } catch (erro) {

    console.log(erro);

    alert("Erro ao salvar nota");

  }
};

// ================= CARREGAR NOTAS =================

async function carregarNotas() {

  const container =
    document.getElementById("listaNotas");

  if (!container) return;

  container.innerHTML = "";

  try {

    const q =
      query(
        collection(db, "notas"),
        orderBy("data", "desc")
      );

    const snapshot =
      await getDocs(q);

    snapshot.forEach((docSnap) => {

      const nota =
        docSnap.data();

      const notaId =
        docSnap.id;

      container.innerHTML += `

        <div class="nota">

          <p>${nota.texto}</p>

          <small>
            ✍️ ${nota.nome || "Usuário"}
          </small>

          <br>

          <button onclick="apagarNota('${notaId}')">
            🗑 Apagar
          </button>

        </div>

      `;
    });

  } catch (erro) {

    console.log(erro);

  }
}

// ================= APAGAR NOTA =================

window.apagarNota = async function (id) {

  try {

    await deleteDoc(
      doc(db, "notas", id)
    );

    carregarNotas();

  } catch (erro) {

    console.log(erro);

    alert("Erro ao apagar");

  }
};

// ================= VOLTAR =================

window.voltar = function () {

  window.location.href =
    "home.html";
};