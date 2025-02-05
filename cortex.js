// Declaring the canvas, the reset button and the start button
const canvas = document.getElementById("canva");
const resetBtn = document.getElementsByClassName("reset")[0];
const startBtn = document.getElementsByClassName("start")[0];
const score = document.querySelector(".score");
let ballCollide = false;

// Declaring the functional loop for the ball's animation
let ballLoop;
let upBall;
let downBall;

// Declaring the ticket passes for the stupid ball 
  let ticketRight = true;
  let ticketDown = true;
  let ticketAbove = true;
  let ticketLeft = true;
  let ticketWall = true;
  let rackUp = true;
  let rackDown = true;

// Adding event listeners to the button
startBtn.addEventListener("click", (e)=>{
    ballCollide = false;
    ticketRight = true;
    ticketDown = true;
    ticketAbove = true;
    ticketLeft = true;
    ticketWall = true;
    rackUp = true;
    rackDown = true;

    // Allowing the ball to move and red racket to become an NPC
    moveBall();
    moveUp();
})

resetBtn.addEventListener("click", resetGame);

let height = canvas.height;
let width = canvas.width;

// Declaring the scores for the 2 sides
let score1 = 0;
let score2 = 0;

// Declaring the properties for the rackets
let prop1 = {
    color: "blue",
    speed: 10,
    width: 25,
    height: 70,
    x:0,
    y: 175
}

let prop2 = {
    color:"red",
    speed: 10,
    width: 25,
    height: 70,
x: 875,
y: 175
}

// Declaring the rackets for drawing
const racket1 = canvas.getContext("2d");
const racket2 = canvas.getContext("2d");

// Function to draw the rackets
function drawRacket(any,color, x, y, width, height){
    any.fillStyle = color;
    any.fillRect(x,y-25,width,height);
}

// Executing the functions above to draw the rackets
drawRacket(racket1, prop1.color, 0, prop1.y, prop1.width, prop1.height);
drawRacket(racket2, prop2.color, prop2.x, prop2.y, prop2.width, prop2.height);

// Declaring the properites for the ball
let propBall = {
    color: "yellow",
    radius: 10,
    x: width/2,
    y: height/2,
    speed: 10
}

//Declaring the ball 
const ball = canvas.getContext("2d");

// Creating the function to draw the ball
function drawBall(x, y, radius, color){
    ball.beginPath();
    ball.arc(x, y, radius, 0, 2*Math.PI);
    ball.fillStyle = color;
    ball.fill();

}

drawBall(propBall.x, propBall.y, propBall.radius, propBall.color);

// Creating keyboard functions to move the blue racket
window.addEventListener("keydown", (e)=>{
    if(e.key.startsWith("Arrow")){
        switch(e.key){

            case "ArrowUp": 
            if(prop1.y > 25){
            racket1.clearRect(prop1.x , prop1.y-25, prop1.width, prop1.height);
            prop1.y -= prop1.speed;
            drawRacket(racket1, prop1.color, prop1.x, prop1.y, prop1.width, prop1.height);
            }
            break;

            case "ArrowDown": 
            if(prop1.y < 305){
            racket1.clearRect(prop1.x , prop1.y-25, prop1.width, prop1.height);
            prop1.y += prop1.speed;
            drawRacket(racket1, prop1.color, prop1.x, prop1.y, prop1.width, prop1.height);
            }
            break;
        }
    }
})


// End of the function for the red racket's motion
// Syntax: drawBall(x, y, radius, color);

function moveUp(){
    if(!ballCollide){
        if(prop2.y > 25){
    racket2.clearRect(prop2.x, prop2.y-25, prop2.width, prop2.height);
    prop2.y -= prop2.speed;
    drawRacket(racket2, prop2.color, prop2.x, prop2.y, prop2.width, prop2.height);
    upBall = requestAnimationFrame(moveUp);
        }
    }
    if(prop2.y == 25){
        rackUp = false;
         moveDown();
    }
}

function moveDown(){
    
if(!ballCollide){
    if(prop2.y + prop2.height < 395){
        racket2.clearRect(prop2.x, prop2.y-25, prop2.width, prop2.height);
        prop2.y += prop2.speed;
        drawRacket(racket2, prop2.color, prop2.x, prop2.y, prop2.width, prop2.height);
        downBall = requestAnimationFrame(moveDown);
    }
}


if(prop2.y + prop2.height == 395){
    rackUp = true;
    rackDown = false;
   moveUp();
}
}

function resetGame(){
    // Blue racket returns to original position
    // Red racket returns to original position 
    // Ball returns to original position 
    // Score resets to 0:0

// Resetting their coordinates to the original format
    prop1.y = 175 
    prop1.x = 0

    prop2.x = 875
    prop2.y = 175

    propBall.x = width/2
    propBall.y = height/2

    ball.clearRect(0,0, width, height);
    ballCollide = true;

    drawRacket(racket1, prop1.color, 0, prop1.y, prop1.width, prop1.height);
drawRacket(racket2, prop2.color, prop2.x, prop2.y, prop2.width, prop2.height);
drawBall(propBall.x, propBall.y, propBall.radius, propBall.color);
score1 = 0;
score2 = 0;
    score.innerHTML = `${score1}:${score2}`;
}

// function to move the ball
function moveBall(){
    if(ticketRight){
    if(!ballCollide){
        if(propBall.x + 10 < 900){
        ball.clearRect(propBall.x - 10, propBall.y -10, 20, 20);
        propBall.x += propBall.speed;
        drawBall(propBall.x, propBall.y, propBall.radius, propBall.color); 
        requestAnimationFrame(moveBall) ;
        }
        if(propBall.x + 10== 900){
                // Blue racket returns to original position
    // Red racket returns to original position 
    // Ball returns to original position 
    // Score resets to 0:0

// Resetting their coordinates to the original format
    prop1.y = 175 
    prop1.x = 0

    prop2.x = 875
    prop2.y = 175

    propBall.x = width/2
    propBall.y = height/2

    ball.clearRect(0,0, width, height);
    ballCollide = true;

    drawRacket(racket1, prop1.color, 0, prop1.y, prop1.width, prop1.height);
drawRacket(racket2, prop2.color, prop2.x, prop2.y, prop2.width, prop2.height);
drawBall(propBall.x, propBall.y, propBall.radius, propBall.color);
score1++;

    score.innerHTML = `${score1}:${score2}`;
        }
    }
        // Check collision
        if(propBall.x + 10 == 870 && propBall.y + 10<= prop2.y + prop2.height){
            ticketRight = false;
          moveBound();
        }
    
}
}

// function to move the ball to the lower bound
function moveBound(){
    if(ticketDown){
   if(!ballCollide){
    if(propBall.y + 10 < 345){
        ball.clearRect(propBall.x -10, propBall.y -10, 20, 20);
        propBall.x -= propBall.speed;
        propBall.y += propBall.speed;
        drawBall(propBall.x, propBall.y, propBall.radius, propBall.color);
        requestAnimationFrame(moveBound);
    }
   }
}
if(propBall.y + 10 == 345){
    ticketDown = false;
    // function to move the ball to the right wall
    moveAbove();
}
}

function moveAbove(){
    if(ticketAbove){
        if(!ballCollide){
            if(propBall.y - 10 > 5){
            ball.clearRect(propBall.x -10, propBall.y -10, 20, 20);
           propBall.x -= propBall.speed;
           propBall.y -= propBall.speed;
           drawBall(propBall.x, propBall.y, propBall.radius, propBall.color);
           requestAnimationFrame(moveAbove);
        }

    }}
    if(propBall.y - 10 == 5){
        ticketAbove = false;
        moveLeft();
    }
}

function moveLeft(){
         if(ticketLeft){
            if(!ballCollide){
                if(propBall.y + 10 < 345){
                    ball.clearRect(propBall.x -10, propBall.y -10, 20, 20);
                propBall.x -= propBall.speed;
                propBall.y += propBall.speed;
                drawBall(propBall.x, propBall.y, propBall.radius, propBall.color);
                requestAnimationFrame(moveLeft);
                }
            }
         }
         if(propBall.y + 10 == 345){
          ticketLeft = false;
          moveWall();
         }
}

function moveWall(){
    if(ticketWall){
        if(!ballCollide){
            if(propBall.x - 10 > 0){
               ball.clearRect(propBall.x -10, propBall.y -10, 20, 20);
               propBall.x -= 20;
               propBall.y -= 20;
               drawBall(propBall.x, propBall.y, propBall.radius, propBall.color);
                requestAnimationFrame(moveWall);
            }
        }
    }
    // Detect collision
    if(propBall.x -10 == 30 && propBall.y + 10 <= prop1.y + prop1.height){
        ticketWall = false;
        ticketRight = true;
        moveBall();
    }

    if(propBall.x -10 == 30){
          // Blue racket returns to original position
    // Red racket returns to original position 
    // Ball returns to original position 
    // Score resets to 0:0

// Resetting their coordinates to the original format
    prop1.y = 175 
    prop1.x = 0

    prop2.x = 875
    prop2.y = 175

    propBall.x = width/2
    propBall.y = height/2

    ball.clearRect(0,0, width, height);
    ballCollide = true;

    drawRacket(racket1, prop1.color, 0, prop1.y, prop1.width, prop1.height);
drawRacket(racket2, prop2.color, prop2.x, prop2.y, prop2.width, prop2.height);
drawBall(propBall.x, propBall.y, propBall.radius, propBall.color);
score2++;
    score.innerHTML = `${score1}:${score2}`;
    }
}