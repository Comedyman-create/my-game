const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ОТКЛЮЧАЕМ СГЛАЖИВАНИЕ
ctx.imageSmoothingEnabled = false;

// ЗАГРУЗКА СПРАЙТА
const playerImage = new Image();
playerImage.src = "archer.png";

// НАСТРОЙКИ СПРАЙТА
const SPRITE_SIZE = 64;
const SCALE = 2;
const DRAW_SIZE = SPRITE_SIZE * SCALE;

// ПОЗИЦИЯ ПЕРСОНАЖА
let playerX = 100;
let playerY = 100;

// АНИМАЦИЯ
let frame = 0;
const maxFrames = 6; // подстрой если кадров больше/меньше
let frameTimer = 0;
const frameDelay = 10;

// УПРАВЛЕНИЕ
const keys = {};

window.addEventListener("keydown", (e) => {
keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
keys[e.key] = false;
});

// ДВИЖЕНИЕ
function update() {
const speed = 2;

if (keys["w"]) playerY -= speed;
if (keys["s"]) playerY += speed;
if (keys["a"]) playerX -= speed;
if (keys["d"]) playerX += speed;
}

// ОТРИСОВКА
function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.drawImage(
playerImage,
frame * SPRITE_SIZE, 0, // берём кадр
SPRITE_SIZE, SPRITE_SIZE,
playerX, playerY,
DRAW_SIZE, DRAW_SIZE
);
}

// АНИМАЦИЯ КАДРОВ
function animate() {
frameTimer++;

if (frameTimer >= frameDelay) {
frame++;
if (frame >= maxFrames) frame = 0;
frameTimer = 0;
}
}

// ГЛАВНЫЙ ЦИКЛ
function gameLoop() {
update();
animate();
draw();
requestAnimationFrame(gameLoop);
}

// СТАРТ
playerImage.onload = () => {
gameLoop();
};
