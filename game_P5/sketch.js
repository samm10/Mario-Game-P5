/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var mountains;
var clouds;
var collectables;
var canyons;

var game_score;
var flagpole = {isReached : false, x_pos: 1500};

var lives;

let flag
let coin
let win
let over
let die
lives = 3;
function preload(){
  flag = loadSound("music/flag.wav")
  over = loadSound("music/over.wav")
  die = loadSound("music/dies.wav")
  jump = loadSound("music/jump.wav")
  coin = loadSound("music/coin.wav")
}

function setup()
{
    
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    startGame();
    
}

game_score = 0;


function draw()
{
	background(72,75,139); 

	noStroke();
	fill(22,10,71);
	rect(0, floorPos_y, width, height/4); 
    push();
    translate(scrollPos,0);

	
    drawClouds();

	// Draw mountains.
    drawMountains();
   

	// Draw trees.
    drawTrees();

	// Draw canyons.
    for(var i = 0; i < canyons.length ; i++)
        {
            drawCanyon(canyons[i]);
            checkCanyon(canyons[i]);
            
        }
    
    for(var i = 0; i < collectables.length; i++)
        {
            
            if(!collectables[i].isFound)
                {
                    drawCollectable(collectables[i]);
                    checkCollectable(collectables[i]);
                }
        }
    
    renderFlagpole();
    
    checkPlayerDie();
    
    
    
    pop();
 
	// Draw game character.
	
	drawGameChar();
    
    fill(255);
    noStroke();
    textSize(18)
    text("Score: " + game_score, 20, 20);
    text("Lives: " + lives, 20, 40);
  
    
    if(lives<1){
      textSize(32)
      text("Game over. Press space to continue" ,width/2-100, height/2-100);
      over.play();
      noLoop();
    }
  
    if(flagpole.isReached){
      textSize(32)
      text("Level complete. Press space to continue",width/2-100, height/2-100)
      flag.play();
      noLoop();
    }

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
    //gravity code
    if(gameChar_y < floorPos_y)
        {
           isFalling = true;
           gameChar_y += 1; 
        }
    else
        {
            isFalling = false;
        }
    if(isPlummeting)
        {
            gameChar_y +=3;
        }

    if(flagpole.isReached == false)
        {
            checkFlagpole();
        }
    
    
	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){
    
    //walk left
    if(keyCode == 37)
        {
            // console.log("left arrow");
            isLeft = true;
        }
    
    //walk right
    else if(keyCode == 39)
        {
            // console.log("right arrow");
            isRight = true;
        }
    
    //jumping, only works if game character is on the ground
    if(keyCode == 32 && (floorPos_y == gameChar_y))
        {
            // console.log("spacebar");
          jump.play()
            if(!isFalling)
            {
              gameChar_y -= 100;   
            }
             
        }
}

function keyReleased()
{
    if(keyCode == 37)
        {
            // console.log("left arrow");
            isLeft = false;
        }
    else if(keyCode == 39)
        {
            // console.log("right arrow");
            isRight = false;
        }

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	noStroke();
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        fill(255,100,100);
    ellipse(gameChar_x-10, gameChar_y-60,25);
    
    fill(255,165,0);
    rect(gameChar_x-16, gameChar_y-45,26,30);
    
    fill(0);
    rect(gameChar_x-25, gameChar_y-15,10,10);
    rect(gameChar_x-5, gameChar_y-15,10,10);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        fill(255,100,100);
    ellipse(gameChar_x+10, gameChar_y-60,25);
    
    fill(255,165,0);
    rect(gameChar_x-10, gameChar_y-45,26,30);
    
    fill(0);
    rect(gameChar_x-5, gameChar_y-15,10,10);
    rect(gameChar_x+15, gameChar_y-15,10,10);

	}
	else if(isLeft)
	{
		// add your walking left code
        fill(255,100,100);
    ellipse(gameChar_x-5, gameChar_y-50,25);
    
    fill(255,165,0);
    rect(gameChar_x-10, gameChar_y-35,13,30);
    
    fill(0);
    rect(gameChar_x-15, gameChar_y-5,18,10);

	}
	else if(isRight)
	{
		// add your walking right code
        fill(255,100,100);
    ellipse(gameChar_x+5, gameChar_y-50,25);
    
    fill(255,165,0);
    rect(gameChar_x, gameChar_y-35,13,30);
    
    fill(0);
    rect(gameChar_x, gameChar_y-5,18,10);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        fill(255,100,100);
    ellipse(gameChar_x, gameChar_y-60,25);
    
    fill(255,165,0);
    rect(gameChar_x-13, gameChar_y-45,26,30);
    
    fill(0);
    rect(gameChar_x-15, gameChar_y-15,10,10);
    rect(gameChar_x+5, gameChar_y-15,10,10);

	}
	else
	{
		// add your standing front facing code
        fill(255,100,100);
    ellipse(gameChar_x, gameChar_y-50,25);
    
    fill(255,165,0);
    rect(gameChar_x-13, gameChar_y-35,26,30);
    
    fill(0);
    rect(gameChar_x-15, gameChar_y-5,10,10);
    rect(gameChar_x+5, gameChar_y-5,10,10);

	}
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
for(var i = 0; i < clouds.length; i++)
    {
    fill(255,250,250);
    
    ellipse(clouds[i].x_pos,clouds[i].y_pos,80,80);
    ellipse(clouds[i].rightx_pos,clouds[i].righty_pos,60,60);
    ellipse(clouds[i].leftx_pos,clouds[i].lefty_pos,60,60);
    ellipse(clouds[i].basex,clouds[i].basey,200,50);   
    }
}

// Function to draw mountains objects.
function drawMountains()
{
    for (var i = 0; i < mountains.length; i++)
    {
    fill(61,72,73);
    triangle(mountains[i].leftx_pos,mountains[i].lefty_pos,
          mountains[i].middlex_pos,mountains[i].middley_pos,
          mountains[i].rightx_pos,mountains[i].righty_pos);
    }
}

// Function to draw trees objects.
function drawTrees()
{
    for(var i = 0; i < trees_x.length; i++)
    {
            
    fill(255,255,255);
    ellipse(trees_x[i],floorPos_y-145,150,150);
    fill(0,0,0);
    rect(trees_x[i]-10,floorPos_y-135,20,137);

	noStroke();
	fill(255);
    
    }
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    fill(0,0,0);
    rect(t_canyon.x_pos,floorPos_y,t_canyon.width,height - floorPos_y);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{

    if(gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y)
        {
    isPlummeting = true;
    
        }
            
}


// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
    fill(22,50,91);
    stroke(255,250,250);
    strokeWeight(3);
    ellipse(t_collectable.x_pos,floorPos_y - t_collectable.size, t_collectable.size, t_collectable.size);  
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
  if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos)< t_collectable.size)
          {
            t_collectable.isFound = true;
            game_score += 1;
            coin.play();
          }
}

function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(180);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(255,0,0);
    noStroke();
    
    if(flagpole.isReached)
    {
      rect(flagpole.x_pos, floorPos_y-250,50,50);  
    }
    
    else
    {
        rect(flagpole.x_pos, floorPos_y-50,50,50)
    }
    
    pop();
}

function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos);
    
    if(d<15)
        {
            flagpole.isReached = true;
        }
    
    // console.log(d);
}

function checkPlayerDie()
{
    if(gameChar_y > floorPos_y + 200 )
        {
            lives -= 1;
            if(lives!=0){
              die.play()
            }
            
            startGame()
        }
  
    
    // if(lives>0);
    // {
    //    startGame();
    // }
}

function startGame()
{
 	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
    
    //two canyons
    canyons = [
        {x_pos: 200, width: 120},
        {x_pos: 700, width: 160},
        {x_pos: 1200, width: 180},
        ];
    
    //two collectables
    collectables = [{x_pos: 430, y_pos: 400, size: 40},
                  
                  {x_pos: 930, y_pos: 400, size: 40}];
    //three clouds
    clouds = [{x_pos:200, y_pos:100, leftx_pos:155, lefty_pos:110, rightx_pos:245, righty_pos:110, basex:200, basey:140},
             
             {x_pos:600, y_pos:60, leftx_pos:555, lefty_pos:70, rightx_pos:645, righty_pos:70, basex:600, basey:100},
             
             {x_pos:1000, y_pos:100, leftx_pos:955, lefty_pos:110, rightx_pos:1045, righty_pos:110, basex:1000, basey:140}];
    
    //two mountains
    mountains = [{leftx_pos: 200, lefty_pos: 435, middlex_pos: 335, middley_pos: 135, rightx_pos: 435, righty_pos: 435, width: 300, height:300},
                
                {leftx_pos: 500, lefty_pos: 435, middlex_pos: 635, middley_pos: 135, rightx_pos: 735, righty_pos: 435, width: 300, height:300}];
    
    //four trees
    trees_x = [100, 300, 500, 1000];
    
    //two collectables
    collectables = [{x_pos: 430, y_pos: 410, size: 40, isFound: false},
                  
                  {x_pos: 930, y_pos: 410, size: 40, isFound: false}];
    	
}