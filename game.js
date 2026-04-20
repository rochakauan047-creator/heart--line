const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const pauseBtn = document.getElementById("pauseBtn");
const homeBtn = document.getElementById("homeBtn");
// --- CARREGAMENTO DE ASSETS (FUTURO) ---
const imgBg = new Image();
imgBg.src = 'caminho/da/sua/floresta.png';

const imgChao = new Image();
imgChao.src = 'caminho/do/seu/chao.png';

const spritePlayer = new Image();
spritePlayer.src = 'caminho/do/sprite-player.png';

const imgObstaculo = new Image();
imgObstaculo.src = 'caminho/do/obstaculo.png';

// Para o fundo infinito
let bgX = 0;
// --- CONFIGURAÇÃO DE TELA CHEIA ---
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// O chão é calculado com base na altura da tela (80% para baixo)
let groundY = () => canvas.height * 0.8;

let player = {
    x: 50,
    w: 40,
    h: 40,
    y: 0,
    vy: 0,
    gravity: 0.8,
    jump: -16,
    grounded: true
};

let obstacles = [];
let score = 0;
let gameActive = false;
let isPaused = false;
let framesSinceLastObstacle = 0;
let minObstacleDistance = 70; // Distância mínima inicial

// DIFICULDADE
let gameSpeed = 5;
let spawnChance = 0.015;
let speedIncrement = 0.0005; // Aceleração suave

// --- EVENTOS ---

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") handleInput();
    if (e.code === "KeyP") togglePause();
});

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    handleInput();
}, { passive: false });

pauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePause();
});

homeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    window.location.href = "home.html"; // Vai para a home
});

function handleInput() {
    if (!gameActive) {
        resetGame();
    } else if (isPaused) {
        togglePause();
    } else if (player.grounded) {
        player.vy = player.jump;
        player.grounded = false;
    }
}

function togglePause() {
    if (!gameActive) return;
    isPaused = !isPaused;
    if (isPaused) {
        pauseBtn.innerText = "Retomar";
        homeBtn.style.display = "block";
    } else {
        pauseBtn.innerText = "Pausar";
        homeBtn.style.display = "none";
        update();
    }
}

function resetGame() {
    player.y = groundY() - player.h;
    player.vy = 0;
    player.grounded = true;
    obstacles = [];
    score = 0;
    gameSpeed = 5;
    framesSinceLastObstacle = 0;
    gameActive = true;
    isPaused = false;
    homeBtn.style.display = "none";
    pauseBtn.innerText = "Pausar";
    update();
}

function update() {
    if (!gameActive || isPaused) {
        if (!gameActive) showMenu();
        if (isPaused) showPauseScreen();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // CHÃO (Linha visual)
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY());
    ctx.lineTo(canvas.width, groundY());
    ctx.stroke();

    // DIFICULDADE
    if (gameSpeed < 18) gameSpeed += speedIncrement;

    // JOGADOR
    player.y += player.vy;
    player.vy += player.gravity;

    if (player.y >= groundY() - player.h) {
        player.y = groundY() - player.h;
        player.vy = 0;
        player.grounded = true;
    }

    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // OBSTÁCULOS (Spawn com distância mínima)
    framesSinceLastObstacle++;
    if (framesSinceLastObstacle > minObstacleDistance) {
        if (Math.random() < spawnChance) {
            let h = 30 + Math.random() * 40;
            obstacles.push({
                x: canvas.width,
                y: groundY() - h,
                w: 25,
                h: h,
                passed: false
            });
            framesSinceLastObstacle = 0;
            minObstacleDistance = 60 + Math.random() * 50; // Varia a distância
        }
    }

    // Loop Obstáculos
    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.x -= gameSpeed;

        ctx.fillStyle = "#ff4444";
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

        // Pontuação ao passar
        if (!obs.passed && player.x > obs.x + obs.w) {
            score += 5;
            obs.passed = true;
        }

        // Colisão
        if (player.x < obs.x + obs.w &&
            player.x + player.w > obs.x &&
            player.y < obs.y + obs.h &&
            player.y + player.h > obs.y) {
            endGame();
        }

        if (obs.x < -100) obstacles.splice(i, 1);
    }

    // UI
    ctx.fillStyle = "white";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${score}`, 20, 40);
    ctx.font = "14px Arial";
    ctx.fillText(`Velocidade: ${gameSpeed.toFixed(1)}`, 20, 65);

    requestAnimationFrame(update);
    function drawBackground() {
    bgX -= gameSpeed * 0.5; // Move mais devagar que o jogo (Parallax)
    if (bgX <= -canvas.width) bgX = 0;
    
    // Desenha a imagem 1 e a imagem 2 colada nela
    ctx.drawImage(imgBg, bgX, 0, canvas.width, canvas.height);
    ctx.drawImage(imgBg, bgX + canvas.width, 0, canvas.width, canvas.height);
}
}

function showMenu() {
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 40px Arial";
    ctx.fillText("Heart-Run", canvas.width / 2, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Toque ou Espaço para Começar", canvas.width / 2, canvas.height / 2 + 50);
}

function showPauseScreen() {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 40px Arial";
    ctx.fillText("PAUSADO", canvas.width / 2, canvas.height / 2);
}

function endGame() {
    gameActive = false;
    homeBtn.style.display = "block";
    setTimeout(() => {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "bold 40px Arial";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "24px Arial";
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 30);
    }, 10);
}

showMenu();
// No lugar do ctx.fillRect(player.x, player.y, player.w, player.h);
// ctx.drawImage(imagem, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

let frameX = Math.floor(Date.now() / 100) % 4; // Muda o frame a cada 100ms (ex: sprite de 4 frames)

ctx.drawImage(
    spritePlayer, 
    frameX * 64, 0, 64, 64, // Corta um quadrado de 64px do sprite sheet
    player.x, player.y, player.w, player.h // Desenha no tamanho do player
);
// Dentro do loop dos obstáculos, no lugar do rect vermelho:
ctx.drawImage(imgObstaculo, obs.x, obs.y, obs.w, obs.h);