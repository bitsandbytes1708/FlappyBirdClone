let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
let score = 0;
const jump = new Audio('jump.wav');
jump.volume = 0.2;
const explode = new Audio('explode.wav');
explode.volume = 0.1;
let widthOfGrass = c.width / 40;
let highScore = localStorage.getItem("highScore");

function drawStartScreen() {
  clear();
  // drawGrass();
}
function drawGrass() {
  for (let i = 0; i < 40; i++) {
    if (i % 2 == 0) {
      ctx.fillStyle = "lightgreen"
    } else {
      ctx.fillStyle = "green"
    }
    ctx.fillRect(i * widthOfGrass, c.height - 20, widthOfGrass, 20)
  }
}
function bounce() {
  if (y > c.height - 20) {  // changed height from - 45 to - 20
    velocity = -(Math.abs((velocity/3)*2))
    console.log("test")
  }
}
function makeArray() {
  pipes = []
  for (let i = 0; i < 100; i++) {
    pipes[i] = 0
  }
  for (let i = 1; i < 100; i++) {
    interval = Math.random() * 200 + 200;
    pipes[i] = pipes[i - 1] + interval
  }
}
function makeHoles() {
  holes = []
  for (let i = 0; i < 100; i++) {
    holes[i] = Math.random() * c.height - 200;
    if ( holes[i] < -150 ) {
      holes[i] += 100;
    }
  }
}
collided = false;
function collisionDetection() {
  for (let i = 0; i < 100; i++) {
    if(pipes[i]-tick<60&&pipes[i]-tick>-20) {
      score = i + 1;
      if (!(y > holes[i] + 20 && y < holes[i] + 180)) {
        collided = true;
        score = i;
      }
    }
  }
}
makeHoles();
tick = -1000;
function drawPipes() {
  tick = tick + 1 + Math.abs(tick / 3000);
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = "darkgreen";
    ctx.fillRect(pipes[i] - tick, 0, 50, c.height);
  }
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = "#ADD8E6"; // added hex color code for later transparency
    ctx.fillRect(pipes[i] - tick - 1, holes[i], 52, 200);
  }
}
makeArray();
function drawFlappy() {
  ctx.beginPath();
  ctx.fillStyle = "yellow"
  ctx.arc(40, y, 20, 0, 2 * Math.PI);
  ctx.fill();
}

let y = c.height / 2
velocity = -2

function updatePosition() {
  y += velocity
  velocity += .1
}

function drawScore () {
  ctx.font='32px serif';
  ctx.fillStyle = "yellow"; // changed score font color
  ctx.fillText(`Score: ${score}`, c.width - 150, 30);
}

function clear() {
   const game_bg = new Image();
   game_bg.src= "bgimage.jpg";
 
   game_bg.onload = function () {
     ctx.drawImage(game_bg, 0, 0, c.width, c.height);
     ctx.fillStyle(game_bg, 0, 0, c.width, c.height);
     ctx.fillRect(0, 0, c.width, c.height);
  }
  // ctx.fillStyle = "lightblue"
  // ctx.fillRect(0, 0, c.width, c.height);
}

function lose() {

  if (collided == true) {
    explode.play();  
    const bg_image = new Image();
    bg_image.src = "bgimage.jpg";
    // bg_image.src = "https://image.freepik.com/free-vector/sunburst-spiral-wallpaper_1284-3501.jpg"; //This picture is free for use, not Copyright needed
    bg_image.onload = function () {
			
      ctx.drawImage(bg_image, 0, 0, c.width, c.height);
      ctx.font = "30px Verdana";
      ctx.fillStyle = "yellow"; // changed font color
      ctx.textAlign = "center"; 
      // changed positioning of scoreboard titles 
      ctx.fillText("Game Over", c.width / 2, c.height / 4); 
      ctx.fillStyle = "white"; // changed font color
      ctx.fillText("Your Score: " + score, c.width / 2, c.height / 4 + 70); 
	    ctx.fillText("High Score: " + highScore, c.width / 2, c.height / 3 + 90);
	 
    }
    playagain.style.display = "inline-block";
  }
}

function clickPlayagain() {
  collided = false;
  document.location.reload()
}
function gameloop() {
  if (collided == false) { 
    clear();
    updatePosition();
    bounce();
    collisionDetection();
    drawPipes();
    drawFlappy();
    // drawGrass();
    drawScore();
    requestAnimationFrame(gameloop)
  } else {
	saveHighScore();
    lose();
  }
}

function saveHighScore()
{
	 if(highScore !== null) {
				if (score >= highScore) {
					localStorage.setItem("highScore", score);      
				}
			} else{
        highScore = score;
				localStorage.setItem("highScore", score);
	  }
}
function clickStart() {
  start.style.display = "none";
  gameloop();
}
drawStartScreen();

// click to fly function
window.addEventListener("keyup", flyFunction);

function flyFunction() {
    velocity=-3;
    jump.play();
}
