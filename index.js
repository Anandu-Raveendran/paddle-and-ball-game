

const canvas = document.getElementById('canvas');
const resize = () => {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 150;
}
resize() // resize the canvas to fit the whole page
window.addEventListener('resize', resize) // listent to page resize changes


let colors = ["red", "orange", "blue", "black", "green"]

let speed = 3
let color = colors[rand(5)];
const boxSize = 50, batWidth = 100
let right = (rand(2) % 2 == 0) ? true : false;
let down = true;
let score = 0
let life = 3;

function rand(num) {
    return Math.floor(Math.random() * num)
}

let x = rand(canvas.width - boxSize), y = 0, oldx = 0, oldy = 0;
let bx = canvas.width / 2, oldbx = 0;
let by = canvas.height - 10

function drawSquare(x, y) {
    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        context.fillStyle = color
        context.clearRect(oldx, oldy, boxSize + 1, boxSize + 1);
        context.fillRect(x, y, boxSize, boxSize);
        oldx = x;
        oldy = y;

    }
}

function drawBat(bx) {
    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        context.fillStyle = "Black"
        context.clearRect(oldbx, by, batWidth, 10);
        if (bx > (canvas.width - batWidth))
            bx = canvas.width - batWidth
        context.fillRect(bx, by, batWidth, 10);
        oldbx = bx;
    }
}


onmousemove = function (e) { bx = e.clientX; drawBat(bx) }
drawBat(bx)

function detectCollision() {

    if (x >= canvas.width - boxSize) {
        right = false
    }
    if (x <= 0) {
        right = true
    }
    if (y <= 0) {
        down = true
    }
    if ((y + boxSize >= canvas.height - 10)) {


        if ((x + boxSize >= bx) && (x <= (bx + batWidth))) {
            down = false
            passed()
        } else {
            failed()
        }
    }
}

function failed() {
    console.log("Life: " + --life)
    x = rand(canvas.width - boxSize), y = 0;
    right = (rand(2) % 2 == 0) ? true : false;
    setLife();
    if (life == 0) {
        window.alert("Game Over! \n Score: " + score)
        if (confirm("Play again??")) {
            location.reload();
        }
        clearTimeout(myTimeout)
    }
}

function passed() {
    console.log("Score: " + ++score)
    setScore();
    if (score % 5 == 0 && score > 0) {
        speed++;
    }
}

function setScore() {
    document.getElementById("score").innerHTML = " Score: " + score + " "
}
setScore()
function setLife() {
    let str = "Life: "
    for (let i = 0; i < life; i++) {
        str += "X"
    }
    let lifeText = document.getElementById("life")
    lifeText.innerHTML = str
}
setLife()

function myFunction(event) {
   bx = event.touches[0].clientX;
   drawBat(bx);
}

function move() {

    drawSquare(x, y);

    detectCollision()

    if (right) {
        x += speed
    } else {
        x -= speed
    }

    if (down) {
        y += speed
    } else {
        y -= speed
    }


    const myTimeout = setTimeout(move, speed / boxSize);
}

move();
