// 🔥 FIREBASE CONFIG
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGWMOLsTvJf5kAMaP8uRWwmDn4Lb1dzNw",
  authDomain: "line-heart-bnc.firebaseapp.com",
  projectId: "line-heart-bnc",
  storageBucket: "line-heart-bnc.firebasestorage.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ================= LOGIN =================

async function cadastrar() {
  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;

  if (!nome || !senha) {
    alert("Preenche tudo!");
    return;
  }

  const emailFake = nome + "@amor.com";

  try {
    const user = await createUserWithEmailAndPassword(auth, emailFake, senha);

    await setDoc(doc(db, "users", user.user.uid), {
      nome,
      pontos: 0
    });

    alert("Cadastrado 💖");
  } catch (e) {
    alert(e.message);
  }
}

async function login() {
  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;

  const emailFake = nome + "@amor.com";

  try {
    await signInWithEmailAndPassword(auth, emailFake, senha);
    window.location.href = "home.html";
  } catch (e) {
    alert("Erro no login");
  }
}

// ================= USUÁRIO =================

async function carregarUsuario() {
  const user = auth.currentUser;
  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));

  if (snap.exists()) {
    const dados = snap.data();

    document.getElementById("usuario").innerText = dados.nome;
    document.getElementById("pontos").innerText = dados.pontos;
  }
}

// ================= GALERIA =================

async function upload() {
  const file = document.getElementById("fileInput").files[0];
  const nome = document.getElementById("nomeInput").value;

  if (!file || !nome) {
    alert("Preenche tudo");
    return;
  }

  const fileName = Date.now() + "_" + file.name;

  const fileRef = ref(storage, "midias/" + fileName);

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  await addDoc(collection(db, "Galeria"), {
    nome,
    url,
    tipo: file.type.startsWith("image") ? "image" : "video",
    data: new Date()
  });

  alert("Enviado 🔥");
  location.reload();
}

async function carregarGaleria() {
  const container = document.getElementById("galeria");
  if (!container) return;

  container.innerHTML = "";

  const snapshot = await getDocs(collection(db, "Galeria"));

  snapshot.forEach(doc => {
    const d = doc.data();

    let conteudo = d.tipo === "image"
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


// ================= INIT =================

window.onload = () => {
  atualizarFrase();
  carregarUsuario();
  carregarGaleria();
};