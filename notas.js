// carregar notas ao abrir
window.onload = carregarNotas;

function adicionarNota() {
  const input = document.getElementById("textoNota");
  const texto = input.value;

  if (!texto) return;

  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  notas.push({
    texto: texto,
    data: new Date().toLocaleDateString()
  });

  localStorage.setItem("notas", JSON.stringify(notas));

  input.value = "";
  carregarNotas();
}

function carregarNotas() {
  const container = document.getElementById("listaNotas");
  container.innerHTML = "";

  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  notas.forEach((n, i) => {
    container.innerHTML += `
      <div class="nota">
        <p>${n.texto}</p>
        <small>${n.data}</small>
        <br>
        <button onclick="apagarNota(${i})">🗑</button>
      </div>
    `;
  });
}

function apagarNota(index) {
  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  notas.splice(index, 1);

  localStorage.setItem("notas", JSON.stringify(notas));
  carregarNotas();
}

function voltar() {
  window.history.back();
}