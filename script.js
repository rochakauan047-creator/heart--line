import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-storage.js";

// 🔥 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBGWMOLsTvJf5kAMaP8uRWwmDn4Lb1dzNw",
  authDomain: "line-heart-bnc.firebaseapp.com",
  projectId: "line-heart-bnc"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

// ================= CADASTRAR =================

async function cadastrar() {

  const nome =
    document.getElementById("nome").value;

  const email =
    document.getElementById("email").value;

  const senha =
    document.getElementById("senha").value;

  if (!nome || !email || !senha) {
    alert("Preenche tudo!");
    return;
  }

  try {

    const userCred =
      await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

    await setDoc(
      doc(db, "users", userCred.user.uid),
      {
        nome,
        email,
        pontos: 0,
        pontosTotal: 0,
        viuUpdate18: false
      }
    );

    mostrarMsg("Cadastro feito 💖 agora faz login!");

  } catch (e) {

    mostrarMsg(e.message, "red");

  }
}

// ================= LOGIN =================

async function login() {

  const email =
    document.getElementById("email").value;

  const senha =
    document.getElementById("senha").value;

  if (!email || !senha) {
    alert("Preenche tudo!");
    return;
  }

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      senha
    );

    window.location.href = "home.html";

  } catch (e) {

    alert("Erro no login");

  }
}

// ================= BOTÕES =================

document
  .getElementById("btnCadastro")
  ?.addEventListener("click", cadastrar);

document
  .getElementById("btnLogin")
  ?.addEventListener("click", login);

// ================= USUÁRIO =================

async function carregarUsuario(user) {

  const snap =
    await getDoc(doc(db, "users", user.uid));

  if (snap.exists()) {

    const dados = snap.data();

    const usuario =
      document.getElementById("usuario");

    const pontos =
      document.getElementById("pontos");

    if (usuario)
      usuario.innerText = dados.nome;

    if (pontos)
      pontos.innerText = dados.pontos ?? 0;
  }
}

// ================= GALERIA =================

async function carregarGaleria() {

  const container =
    document.getElementById("galeria");

  if (!container) return;

  container.innerHTML = "";

  const snapshot =
    await getDocs(collection(db, "Galeria"));

  snapshot.forEach(docSnap => {

    const d = docSnap.data();

    let conteudo =
      d.tipo === "image"
        ? `<img src="${d.url}">`
        : `<video src="${d.url}" controls></video>`;

    container.innerHTML += `
      <div class="card">
        ${conteudo}
        <p>${d.nome}</p>
      </div>
    `;
  });
}

// ================= UPDATE CARD =================

async function mostrarUpdate(user) {

  const card =
    document.getElementById("updateCard");

  if (!card) return;

  try {

    const snap =
      await getDoc(
        doc(db, "users", user.uid)
      );

    if (!snap.exists()) return;

    const dados = snap.data();

    if (!dados.viuUpdate18) {

      card.style.display = "flex";

    } else {

      card.style.display = "none";

    }

  } catch (erro) {

    console.log(erro);

  }
}

// ================= FECHAR UPDATE =================

window.fecharUpdate = async function () {

  const user =
    auth.currentUser;

  if (!user) return;

  try {

    await setDoc(
      doc(db, "users", user.uid),
      {
        viuUpdate18: true
      },
      { merge: true }
    );

    document
      .getElementById("updateCard")
      .style.display = "none";

  } catch (erro) {

    console.log(erro);

  }
};

// ================= FIREBASE READY =================

onAuthStateChanged(auth, async (user) => {

  if (user) {

    carregarUsuario(user);

    carregarGaleria();

    mostrarUpdate(user);

  }

});

// ================= MSG =================

function mostrarMsg(texto, cor = "green") {

  const el =
    document.getElementById("msg");

  if (!el) return;

  el.innerText = texto;

  el.style.color = cor;
}