const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Variabler for slangen, maten og gull eplet
let snake;
let food;
let goldApple;
let direction;
const gridSize = 20; // Størrelse på grid-cellene

// Funksjon for å starte eller tilbakestille spillet
function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  food = generateFood();
  goldApple = null; // Start uten gull eple
  gameLoop(); // Start spillet
}

// Generer ny mat på et tilfeldig sted
function generateFood() {
  // Sjekk om gull eple skal spawn
  if (Math.random() < 0.1) {
    // 10% sjanse for gull eple
    return generateGoldApple(); // Returner gull eple
  } else {
    // Generer vanlig mat
    return {
      x: Math.floor(Math.random() * (canvas.width / gridSize)),
      y: Math.floor(Math.random() * (canvas.height / gridSize)),
      isGold: false, // Marker at dette er ikke et gull eple
    };
  }
}

// Generer gull eple
function generateGoldApple() {
  return {
    x: Math.floor(Math.random() * (canvas.width / gridSize)),
    y: Math.floor(Math.random() * (canvas.height / gridSize)),
    isGold: true, // Marker at dette er et gull eple
  };
}

// Funksjon for å oppdatere spilltilstanden
function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head); // Legg til hodet

  // Sjekk om slangen har spist maten
  if (head.x === food.x && head.y === food.y) {
    if (food.isGold) {
      // Hvis maten er gull eple, legg til 5 segmenter
      for (let i = 0; i < 5; i++) {
        snake.push({}); // Legg til 5 ekstra segmenter
      }
    }
    food = generateFood(); // Generer ny mat
  } else {
    snake.pop(); // Fjern haledelen
  }
}

// Funksjon for å tegne slangen, maten og gull eplet
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Rens canvas

  // Tegn maten
  if (food) {
    ctx.fillStyle = food.isGold ? 'gold' : 'red'; // Velg farge basert på type
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }

  // Tegn slangen
  ctx.fillStyle = 'green';
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * gridSize,
      segment.y * gridSize,
      gridSize,
      gridSize
    );
  });
}

// Hovedloop
function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100); // Juster hastigheten
}

// Funksjon for å håndtere tastetrykk
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Legg til event listener for restart-knappen
document.getElementById('restartButton').addEventListener('click', startGame);

// Start spillet første gang
startGame();
