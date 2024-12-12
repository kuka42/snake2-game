// ustawienia gry
var canvas;
var canvasContext;
var snakeLength = 5;
var snakeSize = 20;
var snakeDirection = "right";
var foodX;
var foodY;
var score = 0;
var snake = [];

// funkcja inicjująca
function gameInit() {
    canvas = document.getElementById('canvas');
    canvasContext = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    canvasContext.fillStyle = "#eeeeee";
    canvasContext.font = "30px monospace";

    createSnake();
    createFood();

    // ustawienie interwału ruchu węża
    setInterval(gameLoop, 100);
}

// funkcja tworząca węża
function createSnake() {
    for (var i = snakeLength - 1; i >= 0; i--) {
        snake.push({ x: i, y: 0 });
    }
}

// funkcja tworząca jedzenie
function createFood() {
    foodX = Math.floor(Math.random() * ((canvas.width / snakeSize) - 1)) + 1;
    foodY = Math.floor(Math.random() * ((canvas.height / snakeSize) - 1)) + 1;
}

// funkcja główna gry
function gameLoop() {
    // ruch węża
    moveSnake();
    // kolizja z jedzeniem
    if (snake[0].x == foodX && snake[0].y == foodY) {
        snakeLength++;
        score++;
        createFood();
    }
    // rysowanie gry
    drawGame();
    // kolizja ze ścianą lub ciałem węża
    checkCollision();
}

// funkcja ruchu węża
function moveSnake() {
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    switch (snakeDirection) {
        case "right":
            snakeX++;
            break;
        case "left":
            snakeX--;
            break;
        case "up":
            snakeY--;
            break;
        case "down":
            snakeY++;
            break;
    }

    // dodawanie nowego elementu do węża
    snake.unshift({x: snakeX, y: snakeY});

    // usuwanie ostatniego elementu z węża tylko gdy nie zjedliśmy jedzenia
    if (snake.length > snakeLength) {
        snake.pop();
    }
}

// funkcja rysująca grę
function drawGame() {
    // rysowanie tła
    canvasContext.fillStyle = "#111111";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // rysowanie węża
    for (var i = 0; i < snake.length; i++) {
        canvasContext.fillStyle = "#eeeeee";
        canvasContext.fillRect(snake[i].x * snakeSize, snake[i].y * snakeSize, snakeSize, snakeSize);
    }

    // rysowanie jedzenia
    canvasContext.fillStyle = "#eeeeee";
    canvasContext.fillRect(foodX * snakeSize, foodY * snakeSize, snakeSize, snakeSize);

// rysowanie wyniku
canvasContext.fillStyle = "#eeeeee";
canvasContext.fillText("score: " + score, 5, 20);

}

// funkcja sprawdzająca kolizję
function checkCollision() {
    // kolizja ze ścianą
    if (snake[0].x < 0) {
        snake[0].x = canvas.width / snakeSize - 1;
    }
    if (snake[0].x >= canvas.width / snakeSize) {
        snake[0].x = 0;
    }
    if (snake[0].y < 0) {
        snake[0].y = canvas.height / snakeSize - 1;
    }
    if (snake[0].y >= canvas.height / snakeSize) {
        snake[0].y = 0;
    }

    // kolizja z ciałem
    for (var i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            // gra się kończy
            snakeLength = 5;
            snakeDirection = "right";
            score = 0;
            snake = [];
        createSnake();
        createFood();
    }
}

}

// funkcja obsługi klawiatury
function keyPressed(event) {
switch (event.keyCode) {
case 37: // lewo
if (snakeDirection != "right") {
snakeDirection = "left";
}
break;
case 38: // góra
if (snakeDirection != "down") {
snakeDirection = "up";
}
break;
case 39: // prawo
if (snakeDirection != "left") {
snakeDirection = "right";
}
break;
case 40: // dół
if (snakeDirection != "up") {
snakeDirection = "down";
}
break;
}
}

// inicjowanie gry
window.onload = function () {
gameInit();
document.addEventListener("keydown", keyPressed);
}
