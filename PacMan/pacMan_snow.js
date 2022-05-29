const TAU = Math.PI * 2;
let canvas, ctx, width, heigth;
let flakes = [];

window.addEventListener('load', () => {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();

    for(let i = 0; i < 30; i++){
        let f = new Flake();
        f.y = Math.random() * heigth;
        flakes.push(f);
    }

    requestAnimationFrame(draw);
});

window.addEventListener('resize', resize);

function resize() {
    width = canvas.width = window.innerWidth;
    heigth = canvas.heigth = window.innerHeight;
}

function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, width, heigth);
    let flakesLength = flakes.length;
    ctx.fillStyle = 'hsl(0, 0%, 100%)';
    ctx.beginPath();
    for(let i = 0; i < flakesLength; i++){
        flakes[i].update().draw();
    }
    ctx.fill();
}

class Flake {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = 0;
        this._x = Math.random() * width;
        this.y = -5;
        this.z = Math.random() * 0.8 + 0.2;
        this.o = Math.random() * Math.PI;
    }
    update() {
        this.x = Math.cos(this.o + this.y * (1 - this.z) * 0.05) * this.z * 20 + this._x;
        this.y += this.z * 8;
        if(this.y > heigth + 5) {
            this.reset();
        }
        return this;
    }
    draw() {
        let r = this.z * 1.5 + 0.5;
        ctx.moveTo(this.x + r, this.y);
        ctx.arc(this.x, this.y, r, 0, TAU);
    }
}

document.getElementById("play").addEventListener("click", function game() {
	const scoreDisplay = document.getElementById("score");
	const width = 28; // 28*28 = 784 squares
	const grid = document.querySelector(".grid")
	const layout = [
		1,1,1,1,1,1,1,1,4,4,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,0,0,0,0,0,0,1,4,4,1,3,1,4,4,1,0,0,0,0,0,0,0,0,0,0,3,1,
		1,0,1,1,1,1,0,1,1,1,1,0,1,4,4,1,1,1,1,0,1,0,1,1,1,0,1,1,
		1,3,1,4,4,1,0,0,0,0,0,0,1,4,4,4,4,4,1,0,0,0,1,4,1,0,1,4,
		1,0,1,4,4,1,0,1,1,0,1,0,1,4,4,4,4,4,1,0,1,0,1,4,1,0,1,4,
		1,0,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,
		1,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,
		1,0,1,1,1,1,0,3,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,
		1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,
		4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,4,4,4,4,4,
		4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
		1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
		4,0,0,0,0,0,0,1,4,1,0,2,2,2,2,2,2,0,1,4,1,0,0,0,0,0,0,4,
		1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
		4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
		4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,1,4,4,4,4,4,
		1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,3,1,0,1,1,1,1,1,1,
		1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,3,1,
		1,0,1,1,1,1,0,3,1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,1,1,1,1,
		1,0,0,0,0,0,0,0,0,0,1,1,4,4,4,4,1,1,0,1,1,0,1,0,1,4,4,4,
		1,1,1,0,1,1,1,1,1,0,1,4,4,4,4,4,4,1,0,0,0,0,1,0,1,4,4,4,
		4,4,1,0,1,4,4,4,1,0,1,4,4,4,4,4,4,1,0,1,1,1,1,0,1,1,1,1,
		1,1,1,0,1,1,1,1,1,0,1,1,1,4,4,1,1,1,0,0,0,0,0,0,0,0,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,1,1,1,0,1,1,0,1,
		1,3,1,1,1,1,1,1,1,1,1,0,1,4,4,1,0,1,0,1,4,4,1,0,1,3,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,4,4,1,0,0,0,0,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,4,4,1,1,1,1,1,1]; 
	const squares = [];
    }
);


// 그리드 그리기
function createBoard() {
    for (let i = 0; i < layout.length ; i++){
        const square = document.createElement("div");
        grid.appendChild(square);
        squares.push(square);

    // 레이아웃 추가
        if (layout[i] === 0) {
            squares[i].classList.add("pac-dot");
        } else if (layout[i] === 1) {
            squares[i].classList.add("wall");
        } else if (layout[i] === 2) {
            squares[i].classList.add("ghost-lair");
        } else if (layout[i] === 3) {
            squares[i].classList.add("power-pellet");
        } else if (layout[i] === 4) {
            squares[i].classList.add("empty");
        }
    }
}
createBoard();

function bestScoreCount() {
    let higher;
	let bestScore = window.localStorage.getItem(higher);
	window.localStorage.setItem(bestScore, higher);
	const bestScoreDisplay = document.getElementById("bestScore");
	if (bestScore == null) {
		bestScore = score;
		window.localStorage.setItem(higher, bestScore);
	} else if (score < Number(window.localStorage.getItem(higher))) {
		bestScore = score;	
	} else if (score > Number(window.localStorage.getItem(higher))) {
		window.localStorage.clear();
		bestScore = score;
		window.localStorage.setItem(higher, bestScore);
	}
	bestScoreDisplay.innerHTML = window.localStorage.getItem(higher);
}
bestScoreCount();

let pacmanCurrentIndex = 518;
squares[pacmanCurrentIndex].classList.add("pac-man");

function movePacman (e) {
    squares[pacmanCurrentIndex].classList.remove("pac-man");
    switch(e.keyCode){
        case 37:
            if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains("wall") && !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) {
                pacmanCurrentIndex -=1;
                squares[pacmanCurrentIndex].style.transform = "scaleX(-1) rotate(95deg)";
                // 팩맨이 왼쪽 출구에 있을 때
                if (pacmanCurrentIndex - 1 === 363) {
                    pacmanCurrentIndex = 391;
            }}
            break;
        case 38:
            if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains("wall") && !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")) { pacmanCurrentIndex -= width;
                squares[pacmanCurrentIndex].style.transform = "scaleY(1)";
            }
            break;
        case 39:
            if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex +1].classList.contains("wall") && !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")){ pacmanCurrentIndex += 1;
                squares[pacmanCurrentIndex].style.transform = "scaleY(1) rotate(95deg)";
                // 팩맨이 오른쪽 출구에 있을 때
                if(pacmanCurrentIndex + 1 === 392) {
                    pacmanCurrentIndex = 364;
            }}
            break;
        case 40:
            if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains("wall") && !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")) {
                pacmanCurrentIndex += width;
                squares[pacmanCurrentIndex].style.transform = "rotate(190deg)";
            }
            break;
    }

    squares[pacmanCurrentIndex].classList.add("pac-man");

    pacDotEaten();
    powerPelletEaten();
    checkForGameOver();
    checkForWin();
}

document.addEventListener("keydown", movePacman);