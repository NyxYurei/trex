
var trex ,trex_running, hittrex;
var floor, ground;
var shadow;
var clouds, cloudimg;
var cactus; 
var cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;
var  score = 0;
var gameState = 1;
var cactusgroup, cloudsgroup;
var gameovertext, gameOver, restart, restartIg;
var jumpSound, dieSound, checkpoitSound;
var counter = 0;

function preload(){
  trex_running = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  hittrex = loadAnimation ("trex_collided.png");
  ground = loadImage ("ground2.png");
  cloudimg = loadImage ("cloud.png");
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  gameovertext = loadImage("gameOver.png");
  restartIg = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpoitSound = loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  //create the sprites
  floor = createSprite (windowWidth/2, windowHeight/2, windowWidth, 10);
  floor.addImage ("ground", ground);
  //floor.scale = 0.7;
  shadow = createSprite (windowWidth/43, windowHeight - 365, 15, 15);
  //shadow.visible = false;
  trex = createSprite (40, 160, 10, 10);
  trex.addAnimation ("running", trex_running);
  trex.addAnimation ("hit", hittrex);
  trex.scale = 0.4; 
  gameOver= createSprite (windowWidth, windowHeight, 10, 10);
  gameOver.addImage ("text", gameovertext);
  gameOver.scale = 0.9;
  gameOver.depth = +6;
  restart = createSprite (290, 150, 10, 10);
  restart.addImage ("rest", restartIg)
  restart.scale = 0.4;


  cactusgroup = createGroup();
  cloudsgroup = createGroup();
}




function draw(){
  background("black");

   text("Score: " + score, 500, 40);
    
   if(keyWentDown("space") && trex.y >  172 || touches.lenght > 0){
    touches = [];
    trex.velocityY = -11; 
  jumpSound.play();
  }

 
  if(gameState == 1){

    counter++
    score = score + Math.round(counter/60);
      

    trex.velocityY = trex.velocityY + 0.5;
    createClouds();
   createCactus();
   gameOver.visible = false;
   restart.visible = false;
   floor.velocityX = -(5+ 3* score/500);
   if(trex.isTouching(cactusgroup)){
     gameState = 2;
     dieSound.play();
    }
  }
  if(gameState == 2){
   cactusgroup.setVelocityXEach(0); 
   cloudsgroup.setVelocityXEach(0); 
   floor.velocityX = 0;
   cactusgroup.setLifetimeEach(-1);
   cloudsgroup.setLifetimeEach(-1);
   gameOver.visible = true;
   restart.visible = true;
   trex.changeAnimation("hit");
   trex.velocityY = 0;
  
  }



  if(mousePressedOver(restart)){
    restart.visible = false;
    gameOver.visible = false;
    cactusgroup.destroyEach();
    cloudsgroup.destroyEach();
    trex.changeAnimation("running")
    score = 0;
    counter = 0;
    gameState = 1;
  }

   if(score%500 == 0 && score > 0){
   checkpoitSound.play();

   }

  if(floor.x < 0){
   floor.x = floor.width/2;
  }
  

  

  
  

 



 trex.collide(shadow);  
 
 

 drawSprites()
}

function createClouds(){
  var cloud = random (43, 110);
 if(frameCount % 50 == 0){
   clouds = createSprite (windowWidth, cloud, 20, 20)
   clouds.velocityX = -(6 + score/500);
   clouds.addImage ("clou", cloudimg);
   clouds.scale = 1;
   clouds.depth = trex.depth;
   trex.depth = trex.depth + 1;
   cloud.lifetime = 200;
   cloudsgroup.add(clouds);
  }
}

function createCactus(){
  
  if(score < 2000){
   
    if(frameCount % 100 == 0 ){
     cactus = createSprite (windowWidth, windowHeight/2, 10, 30)
     cactus.velocityX = -(6 + score/500);
     cactus.scale = 0.5
     var cact = Math.round(random(1, 6));
     cactus.lifetime = 400;
     switch(cact){
     case 1: cactus.addImage(cactus1)
     break;
     case 2: cactus.addImage(cactus2)
     break;
     case 3: cactus.addImage(cactus3)
     break;
     case 4: cactus.addImage(cactus4)
     break;
     case 5: cactus.addImage(cactus5)
     break;
     case 6: cactus.addImage(cactus6)
     break;
     default:
      break;
     }
     cactusgroup.add(cactus);
    }  
 }else{
 
  if(frameCount % 80 == 0 ){
    cactus = createSprite (windowWidth, windowHeight/2, 10, 30)
    cactus.velocityX = -(6 + score/500);
    cactus.scale = 0.5
    var cact = Math.round(random(1, 6));
    cactus.lifetime = 180;
    switch(cact){
    case 1: cactus.addImage(cactus1)
    break;
    case 2: cactus.addImage(cactus2)
    break;
    case 3: cactus.addImage(cactus3)
    break;
    case 4: cactus.addImage(cactus4)
    break;
    case 5: cactus.addImage(cactus5)
    break;
    case 6: cactus.addImage(cactus6)
    break;
    default:
     break;
    }
    cactusgroup.add(cactus);
   }  

 }
}