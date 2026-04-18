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

  const hoje = new Date();

  const inicioAno = new Date(hoje.getFullYear(), 0, 0);
  const diff = hoje - inicioAno;
  const umDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(diff / umDia);

  const index = diaDoAno % frases.length;

  document.getElementById("frase").innerText = frases[index];
}

// botão de info
function mostrarInfo() {
  alert("Nosso cantinho especial 💖");
}

// roda quando carregar
window.onload = atualizarFrase;
async function upload() {
  const file = document.getElementById("fileInput").files[0];
  const nome = document.getElementById("nomeInput").value;

  if (!file || !nome) {
    alert("Preenche tudo aí, doente 😂");
    return;
  }

  const fileName = Date.now() + "_" + file.name;

  const ref = storage.ref("midias/" + fileName);

  await ref.put(file);

  const url = await ref.getDownloadURL();

  await db.collection("Galeria").add({
    nome: nome,
    url: url,
    tipo: file.type.startsWith("image") ? "image" : "video",
    data: new Date()
  });

  alert("Enviado 🔥");
  location.reload();
}
async function carregar() {
  const container = document.getElementById("galeria");

  const snapshot = await db.collection("Galeria").get();

  snapshot.forEach(doc => {
    const d = doc.data();

    let conteudo = "";

    if (d.tipo === "image") {
      conteudo = `<img src="${d.url}">`;
    } else {
      conteudo = `<video src="${d.url}" controls></video>`;
    }

    container.innerHTML += `
      <div class="card">
        ${conteudo}
        <p>${d.nome}</p>
        <button onclick="baixar('${d.url}','${d.nome}')">Baixar</button>
      </div>
    `;
  });
}

carregar();
db.ref("Galeria").on("value", snapshot => {
  const dados = snapshot.val();

  const container = document.getElementById("galeria");
  container.innerHTML = "";

  for (let id in dados) {
    const item = dados[id];

    if (item.tipo === "image") {
      container.innerHTML += `
        <div>
          <img src="${item.url}" width="200">
          <p>${item.nome}</p>
        </div>
      `;
    }

    if (item.tipo === "video") {
      container.innerHTML += `
        <div>
          <video src="${item.url}" width="200" controls></video>
          <p>${item.nome}</p>
        </div>
      `;
    }
  }
});
function mostrarData(img) {
  const data = img.parentElement.querySelector(".data");

  if (data.style.display === "block") {
    data.style.display = "none";
  } else {
    data.style.display = "block";
  }
}
function mostrarData(img) {
  const item = img.parentElement;
  item.classList.toggle("ativo");
}
function abrirModal(img) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalData = document.getElementById("modalData");

  const data = img.parentElement.querySelector(".data");

  modal.style.display = "flex";
  modalImg.src = img.src;
  modalData.innerText = data ? data.innerText : "Sem data";
}
function fecharModal() {
  document.getElementById("modal").style.display = "none";
}