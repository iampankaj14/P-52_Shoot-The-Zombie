var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombies, zombiesImage;
var bullet;

var PLAY = 1;
var END = 0
var gameState = PLAY;
var score = 0;
var score = 0;

var life = 5;

var heart1Img;

var explosionMusic;
var winMusic;
var loseMusic;

var restart, restartImage;


function preload() {
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");

  bgImg = loadImage("assets/bg.jpeg");
  zombiesImage = loadImage("assets/zombie.png");

  heart1Img = loadImage("assets/heart_1.png");

  explosionMusic = loadSound("assets/explosion.mp3");
  winMusic = loadSound("assets/win.mp3");
  loseMusic = loadSound("assets/lose.mp3");

  restartImage = loadImage("assets/reset.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.1;

  //creating the player sprite
  player = createSprite(displayWidth - 1170, displayHeight - 350, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;

  zombiesGroup = createGroup();
  bulletGroup = createGroup();
  
  player.debug = false;
  player.setCollider("rectangle", 0, 0, 300, 300);

  
  scoreboard = createElement("h1");
}

function draw() {
  background(0);

  scoreboard.html("Score: " + score);
  scoreboard.style("color:white");
  scoreboard.position(displayWidth - 1240,displayHeight - 770);

  if(gameState === PLAY){
    //moving the player up and down and making the game mobile compatible using touches
    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 30;
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 30;
    }

    //release bullets and change the image of shooter to shooting position when space is pressed
    if (keyWentDown("space")) {
      player.addImage(shooter_shooting);
      spawnBullet();
    }

    //player goes back to original standing image once we stop pressing the space bar
    if (keyWentUp("space")) {
      player.addImage(shooterImg);
    }
    spawnZombies();

/*    if(zombiesGroup.isTouching(bulletGroup)){
      for(var i = 0; i<zombiesGroup.length; i++){
        if(zombiesGroup.isTouching(bulletGroup)){
          zombiesGroup[i].destroy();
          score = score + 5;
        }
      }
    }*/

    zombiesGroup.overlap(bulletGroup, function (collector, collected){
      collector.remove();
      collected.remove();
      score = score + 5;
      explosionMusic.play();
    })

    if (zombiesGroup.isTouching(player)) {
      for (var i = 0; i < zombiesGroup.length; i++) {
        if (zombiesGroup.isTouching(player)) {
          zombiesGroup[i].destroy();
          life = life - 1;
        }
      }
    }

   if (life === 0) {
     gameState = END;
   }

   
   
   
  } else if(gameState === END){
     
      zombiesGroup.destroyEach();

      bulletGroup.destroyEach()
    
      player.destroy();

/*      swal({
        title: `Game Over ;(`,
        text: "Ohh! You Lost The Game :/",
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks for playing :)",
      });*/

    //  loseMusic.play();
    restart = createSprite(displayWidth - 450, displayHeight - 700, 50, 50);
    restart.addImage(restartImage);
    restart.scale = 0.1;
    if (mousePressedOver(restart) && gameState === END) {
      gameState = PLAY;
      bulletGroup.destroyEach();
      zombiesGroup.destroyEach();
    }
  }

  
  
  drawSprites();

   if(life === 1) {
     image(heart1Img, displayWidth - 160, displayHeight - 750, 55, 55);
   }

   if(life === 2){
     image(heart1Img, displayWidth - 160, displayHeight - 750, 55, 55);
     image(heart1Img, displayWidth - 220, displayHeight - 750, 55, 55);
   }

   if(life === 3){
     image(heart1Img, displayWidth - 160, displayHeight - 750, 55, 55);
     image(heart1Img, displayWidth - 220, displayHeight - 750, 55, 55);
     image(heart1Img, displayWidth - 280, displayHeight - 750, 55, 55);
    }

    if(life === 4){
     image(heart1Img, displayWidth - 160, displayHeight - 750, 55, 55);
     image(heart1Img, displayWidth - 220, displayHeight - 750, 55, 55);
     image(heart1Img, displayWidth - 280, displayHeight - 750, 55, 55);
     image(heart1Img, displayWidth - 340, displayHeight - 750, 55, 55);
    }

    if(life === 5){
     image(heart1Img, displayWidth - 160, displayHeight - 750, 55, 55);
     image(heart1Img, displayWidth - 220, displayHeight - 750, 55, 55);
     image(heart1Img, displayWidth - 280, displayHeight - 750, 55, 55);
     image(heart1Img, displayWidth - 340, displayHeight - 750, 55, 55);
     image(heart1Img, displayWidth - 400, displayHeight - 750, 55, 55);
    }
}

function spawnZombies() {
  if (frameCount % 60 === 0) {
    zombies = createSprite(displayWidth - 10, displayHeight - 300, 40, 50);
    zombies.addImage(zombiesImage);
    zombies.velocityX = -3;
    zombies.scale = 0.175;
    zombies.y = Math.round(random(displayHeight - 450, displayHeight - 250));
    zombies.lifeTime = 700;
    zombiesGroup.add(zombies);
  }
}

function spawnBullet() {
  bullet = createSprite(player.x + 65, player.y - 24, 20, 5);
  bullet.shapeColor = "yellow";
  bullet.velocityX = 7;
  bulletGroup.add(bullet)
}
