const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerImage = new Image();
playerImage.src = "archer.png";

let player = {
    x: 100,
    y: 100,
    width: 64,
    height: 64,
    speed: 3
};

const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function update() {
    if (keys["w"]) player.y -= player.speed;
    if (keys["s"]) player.y += player.speed;
    if (keys["a"]) player.x -= player.speed;
    if (keys["d"]) player.x += player.speed;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // просто рисуем ВСЮ картинку
    ctx.drawImage(
        playerImage,
        player.x,
        player.y,
        player.width,
        player.height
    );
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

playerImage.onload = () => {
    gameLoop();
};
