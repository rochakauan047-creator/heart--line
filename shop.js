// CONFIG EMAILJS
const SERVICE_ID = "service_8zanncr"; 
const TEMPLATE_ID = "template_sgxagw8";
const PUBLIC_KEY = "qP-YfzGvuCz9-yPIn";

emailjs.init(PUBLIC_KEY);

// LISTA DE PRESENTES
const presentes = [
    { id: 1, nome: "Vale Jantar", preco: 80, img: "https://cdn-icons-png.flaticon.com/512/3448/3448651.png" },
    { id: 2, nome: "Massagem 30min", preco: 80, img: "https://cdn-icons-png.flaticon.com/512/103/103956.png" },
    { id: 3, nome: "Noite de Cinema", preco: 30, img: "https://cdn-icons-png.flaticon.com/512/2503/2503508.png" },
    { id: 4, nome: "Café na Cama", preco: 40, img: "https://cdn-icons-png.flaticon.com/512/3204/3204340.png" },
    { id: 5, nome: "10 Beijos Extras", preco: 10, img: "https://cdn-icons-png.flaticon.com/512/838/838618.png" },
    { id: 6, nome: "Lavar o Cabelo", preco: 35, img: "https://cdn-icons-png.flaticon.com/512/2610/2610702.png" },
    { id: 7, nome: "Piquenique", preco: 60, img: "https://cdn-icons-png.flaticon.com/512/2755/2755314.png" },
    { id: 8, nome: "Playlist Amor", preco: 25, img: "https://cdn-icons-png.flaticon.com/512/4430/4430730.png" },
    { id: 9, nome: "Lavar a Louça", preco: 50, img: "https://cdn-icons-png.flaticon.com/512/2090/2090532.png" },
    { id: 10, nome: "Dia do Sim (3h)", preco: 150, img: "https://cdn-icons-png.flaticon.com/512/190/190411.png" },
    { id: 11, nome: "Perdão Teimosia", preco: 100, img: "https://cdn-icons-png.flaticon.com/512/1029/1029183.png" },
    { id: 12, nome: "Cozinhar p/ Ela", preco: 70, img: "https://cdn-icons-png.flaticon.com/512/1830/1830839.png" },
    { id: 13, nome: "Skincare Casal", preco: 20, img: "https://cdn-icons-png.flaticon.com/512/3204/3204000.png" },
    { id: 14, nome: " Viagem", preco: 300, img: "https://cdn-icons-png.flaticon.com/512/201/201623.png" },
    { id: 15, nome: "Ver Pôr do Sol", preco: 45, img: "https://cdn-icons-png.flaticon.com/512/2924/2924483.png" },
    { id: 16, nome: "Saida surpresa", preco: 60, img: "https://cdn-icons-png.flaticon.com/512/3094/3094595.png" },
    { id: 17, nome: "Noite de Jogos", preco: 40, img: "https://cdn-icons-png.flaticon.com/512/3035/3035695.png" },
    { id: 18, nome: "Jantar VIP", preco: 500, img: "https://cdn-icons-png.flaticon.com/512/3163/3163181.png" }
];

// CARREGAR LOJA
function carregarLoja() {
    const container = document.getElementById("lista-presentes");
    const pontos = parseInt(localStorage.getItem("pontos")) || 0;

    document.getElementById("loja-pontos").innerText = pontos;
    container.innerHTML = "";

    presentes.forEach(item => {
        const podeComprar = pontos >= item.preco;

        container.innerHTML += `
            <div class="shop-item">
                <img src="${item.img}">
                <h4>${item.nome}</h4>
                <p>${item.preco} Pontos</p>

                <input type="date" id="data-${item.id}" class="input-data-compra">

                <button onclick="comprarItem(${item.id})" class="btn-comprar" ${podeComprar ? "" : "disabled"}>
                    ${podeComprar ? "Agendar 🎁" : "Insuficiente"}
                </button>
            </div>
        `;
    });
}

// COMPRAR ITEM
async function comprarItem(id) {
    const item = presentes.find(p => p.id === id);
    const data = document.getElementById(`data-${id}`).value;
    let pontos = parseInt(localStorage.getItem("pontos")) || 0;
    const usuario = localStorage.getItem("usuario") || "Sua Namorada";

    if (!data) {
        alert("Escolhe uma data primeiro 📅");
        return;
    }

    if (pontos >= item.preco) {
        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                from_name: usuario,
                item_comprado: `${item.nome} (${data})`
            });

            pontos -= item.preco;
            localStorage.setItem("pontos", pontos);

            salvarNaAgenda(item.nome, data);

            alert("Agendado com sucesso ❤️");

            carregarLoja();
            carregarAgenda();
        } catch (err) {
            alert("Erro ao enviar e-mail");
        }
    }
}

// SALVAR NA AGENDA
function salvarNaAgenda(nome, data) {
    let agenda = JSON.parse(localStorage.getItem("agenda")) || [];

    agenda.push({
        id: Date.now(),
        nome,
        data
    });

    localStorage.setItem("agenda", JSON.stringify(agenda));
}

// CARREGAR AGENDA
function carregarAgenda() {
    const container = document.getElementById("agenda-resgates");
    let agenda = JSON.parse(localStorage.getItem("agenda")) || [];

    if (agenda.length === 0) {
        container.innerHTML = "<p>Nenhum agendamento ainda 👀</p>";
        return;
    }

    agenda.sort((a, b) => new Date(a.data) - new Date(b.data));

    container.innerHTML = "";

    agenda.forEach(item => {
        const dataBR = new Date(item.data).toLocaleDateString('pt-BR');

        container.innerHTML += `
            <div class="agenda-card">
                <div class="agenda-info">
                    <strong>${item.nome}</strong>
                    <span>📅 ${dataBR}</span>
                </div>
                <button onclick="removerDaAgenda(${item.id})" class="btn-check">✓</button>
            </div>
        `;
    });
}

// REMOVER
function removerDaAgenda(id) {
    let agenda = JSON.parse(localStorage.getItem("agenda")) || [];
    agenda = agenda.filter(item => item.id !== id);

    localStorage.setItem("agenda", JSON.stringify(agenda));
    carregarAgenda();
}

// BUSCA
function filtrarLoja() {
    const termo = document.getElementById("input-busca").value.toLowerCase();
    const itens = document.querySelectorAll(".shop-item");

    itens.forEach(item => {
        const nome = item.querySelector("h4").innerText.toLowerCase();
        item.style.display = nome.includes(termo) ? "block" : "none";
    });
}

// INIT
window.addEventListener("load", () => {
    carregarLoja();
    carregarAgenda();
});