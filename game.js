const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const pauseBtn = document.getElementById("pauseBtn");
const homeBtn = document.getElementById("homeBtn");
let framesSinceLastObstacle = 0; // Conta quanto tempo passou desde o último spawn
let minObstacleDistance = 60;   // Distância mínima (em frames) entre um e outro
let player = {
  x: 50,
  y: 200,
  w: 40,
  h: 40,
  vy: 0,
  gravity: 0.8,
  jump: -15,
  grounded: true
};

let obstacles = [];
let score = 0;
let gameActive = false;
let isPaused = false;

// --- VARIÁVEIS DE DIFICULDADE PROCEDURAL ---
let gameSpeed = 4; 
let spawnChance = 0.015;
let speedIncrement = 0.001; // O quanto a velocidade sobe a cada frame

// --- CONTROLES ---

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") handleInput();
  if (e.code === "KeyP") togglePause();
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  handleInput();
}, {passive: false});

pauseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  togglePause();
});

homeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  goToMenu();
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

function goToMenu() {
  gameActive = false;
  isPaused = false;
  homeBtn.style.display = "none";
  pauseBtn.innerText = "Pausar";
  showMenu();
}

function resetGame() {
  player.y = 200;
  player.vy = 0;
  player.grounded = true;
  obstacles = [];
  score = 0;
  
  // RESET DA DIFICULDADE
  gameSpeed = 4;
  spawnChance = 0.015;
  
  gameActive = true;
  isPaused = false;
  homeBtn.style.display = "none";
  pauseBtn.innerText = "Pausar";
  update();
}

function update() {
  if (!gameActive) {
    showMenu();
    return;
  }

  if (isPaused) {
    showPauseScreen();
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // --- DIFICULDADE PROCEDURAL EM AÇÃO ---
  // Aumenta a velocidade gradualmente até um limite
  if (gameSpeed < 15) {
    gameSpeed += speedIncrement;
    // Aumenta a chance de spawn conforme a velocidade sobe, para não ficar vazio
    spawnChance = 0.01 + (gameSpeed / 1000); 
  }

  // PLAYER
  player.y += player.vy;
  player.vy += player.gravity;

  if (player.y >= 200) {
    player.y = 200;
    player.vy = 0;
    player.grounded = true;
  }

  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.w, player.h);
// --- GERAR OBSTÁCULOS COM DISTÂNCIA MÍNIMA ---
  framesSinceLastObstacle++; // Aumenta o contador a cada frame

  // Só tenta gerar se já passou o tempo mínimo de segurança
  if (framesSinceLastObstacle > minObstacleDistance) {
    if (Math.random() < spawnChance) {
      let variacaoH = 20 + Math.random() * 30;
      obstacles.push({
        x: 800,
        y: 240 - variacaoH,
        w: 20 + Math.random() * 15,
        h: variacaoH,
        passed: false
      });
      
      // RESET o contador para obrigar o jogo a esperar antes do próximo
      framesSinceLastObstacle = 0; 
      
      // OPCIONAL: Deixar a distância mínima aleatória para o jogo não ficar repetitivo
      minObstacleDistance = 50 + Math.random() * 40; 
    }
  }
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    obs.x -= gameSpeed; // Usa a velocidade dinâmica

    ctx.fillStyle = "red";
    ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

    if (!obs.passed && player.x > obs.x + obs.w) {
      score += 5;
      obs.passed = true;
    }

    if (
      player.x < obs.x + obs.w &&
      player.x + player.w > obs.x &&
      player.y < obs.y + obs.h &&
      player.y + player.h > obs.y
    ) {
      endGame();
    }

    if (obs.x < -50) obstacles.splice(i, 1);
  }

  // UI
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Score: ${score}`, 20, 40);
  ctx.font = "14px Arial";
  ctx.fillText(`Velocidade: ${gameSpeed.toFixed(1)}x`, 20, 65);

  requestAnimationFrame(update);
}

// (As funções showPauseScreen, showMenu e endGame permanecem as mesmas das versões anteriores)
function showPauseScreen() {
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "40px Arial";
  ctx.fillText("PAUSADO", canvas.width / 2, canvas.height / 2);
}

function showMenu() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "30px Arial";
  ctx.fillText("Mini Dino Procedural 🦖", canvas.width / 2, canvas.height / 2);
  ctx.font = "18px Arial";
  ctx.fillText("Toque ou Espaço para Começar", canvas.width / 2, canvas.height / 2 + 40);
}

function endGame() {
  gameActive = false;
  homeBtn.style.display = "block";
  setTimeout(() => {
    ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score} | Nível: ${gameSpeed.toFixed(1)}`, canvas.width / 2, canvas.height / 2 + 40);
  }, 10);
}

showMenu();
function goToMenu() {
  // Em vez de resetar variáveis, redirecionamos a página
  window.location.href = "home.html"; 
}