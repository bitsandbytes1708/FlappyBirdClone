var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var score;
var widthOfGrass=c.width/40;
function drawGrass() {
  for(var i = 0; i<40; i++) {
    if(i%2==0) {
      ctx.fillStyle="lightgreen"
    } else {
      ctx.fillStyle="green"
    }
    ctx.fillRect(i*widthOfGrass, c.height-20, widthOfGrass,20)  
  }
}
function bounce() {
  if(y>c.height-45) {
    velocity=-4
    console.log("test")
  }
}
function makeArray() {
  pipes=[]
  for(var i = 0; i<100; i++) {
    pipes[i]=0
  }
  for(var i = 1; i<100; i++) {
    interval=Math.random()*200+200;
    pipes[i]=pipes[i-1]+interval
  }
}
function makeHoles() {
  holes=[]
  for(var i = 0; i<100; i++) {
    holes[i]=Math.random()*c.height-200
  }
}
collided=false;
function collisionDetection() {
  for(var i = 0; i<100; i++) {
    if(pipes[i]-tick<60 && pipes[i]-tick>-20) {
      if(!(y>holes[i]+20 && y<holes[i]+180)) {
        collided=true;
        score=i;
      }
    }
  }
}
makeHoles();
tick=-1000;
function drawPipes() {
  tick=tick+1+Math.abs(tick/3000);
  for(var i = 0; i<100; i++) {
    ctx.fillStyle="darkgreen"
    ctx.fillRect(pipes[i]-tick, 0, 50, c.height);
  }
  for(var i = 0; i<100; i++) {
    ctx.fillStyle="lightblue"
    ctx.fillRect(pipes[i]-tick-1, holes[i], 52, 200)
  }
}
makeArray();
function drawFlappy() {
  ctx.beginPath();
  ctx.fillStyle="yellow"
  ctx.arc(40, y, 20, 0, 2 * Math.PI);
  ctx.fill();
}
var y = c.height/2
velocity=-2
function updatePosition() {
  y+=velocity
  velocity+=.1
}
function clear() {
  ctx.fillStyle="lightblue"
  ctx.fillRect(0,0,c.width,c.height);
}
function lose() {
  ctx.fillStyle="red"
  ctx.fillRect(0,0,c.width,c.height)
  ctx.font = "30px Arial";
  ctx.fillStyle="black"
  ctx.textAlign = "center";
  ctx.fillText("You Lost", c.width/2, c.height/2);
  ctx.fillText("Your score was: " + score, c.width/2, c.height/2+100);
}
function gameloop() {
  if(collided==false) {
    clear();
    updatePosition();
    bounce();
    collisionDetection();
    drawPipes();
    drawFlappy();
    drawGrass();
    requestAnimationFrame(gameloop)
  } else {
    lose();
  }
}
gameloop();
window.addEventListener('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if(key == "ArrowUp") {
      velocity=-3
    }
});
