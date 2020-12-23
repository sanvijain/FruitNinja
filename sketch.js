//creating variable
var PLAY=1;
var END=0;
var gameState=PLAY;
var sword,swordImage;
var fruit1,fruitImage1,fruit2,fruitImage2,fruit3,fruitImage3,fruit4,fruitImage4,fruitGroup,enemyGroup;
var monster1,monsterImage1,monster2,monsterImage2;
var gameOverImage;
var gameoverSound,knifeSwooshSound;
var score;

function preload(){
 //loading the images 
  swordImage=loadImage("sword.png");
  fruitImage1=loadImage("fruit1.png");
  fruitImage2=loadImage("fruit2.png");
  fruitImage3=loadImage("fruit3.png");
  fruitImage4=loadImage("fruit4.png");
  monsterImage1=loadImage("alien1.png");
  monsterImage2=loadImage("alien2.png");
  gameOverImage=loadImage("gameover.png");
  gameoverSound=loadSound("gameover.mp3")
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3")
 
}

function setup(){
  //creating canvas
  createCanvas(600,520);
  
  //creating sprite for sword
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  //setting radius of trex
  sword.setCollider("rectangle",0,0,40,40);
  //applying into our code
  sword.debug=false;
  
  //creating groups
  fruitGroup=new Group();
  enemyGroup=new Group();
  
  //setting the value of score as 0
  score=0;
  
}

function draw(){
  //setting background
  background("lightblue");
  
  //Game state is in play
    if(gameState===PLAY){
      
   //the 2 functions should work
    fruits();
    Enemy();
      
   //move the sword with its x and y position
    sword.y=World.mouseY;
    sword.x=World.mouseX;
      
    //Increasing the score and destroy the fruitGroup
      if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score+1;
}
      //Game state is in end
      else{
        if(enemyGroup.isTouching(sword)){
  
     gameState=END;
          
     //adding sound
     gameoverSound.play();     
          
  //change the sword image to game over image 
    sword.addImage(gameOverImage);
    sword.scale=2;
    sword.x=300;
    sword.y=260;
          
  //destroy the groups
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
          
 //set velocity to 0
    fruitGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);    
      }
   }
}
  

  //Display
  drawSprites();
  
  //Display the text
  textSize(15);
  fill("black");
  text("Score: "+score,520,20);

}

//creating the function for fruits
function fruits(){
  if(World.frameCount%80===0){
    var fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    var rand=Math.round(random(1,4));
    if(rand == 1){
      fruit.addImage(fruitImage1);
   }
    else if(rand==2){
      fruit.addImage(fruitImage2);
    }
    else if(rand==3){
      fruit.addImage(fruitImage3);
    }
    else {
      fruit.addImage(fruitImage4);
    }
    
    fruit.y=Math.round(random(50,340));
    fruit.velocityX=-(7+score/4);
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}
//creating the function for enemy
function Enemy(){
  if(World.frameCount%200===0){
   monster=createSprite(400,200,20,20);
    var r=Math.round(random(1,2));
    if(r==1){
      monster.addImage(monsterImage1);
     }
    else{
      monster.addImage(monsterImage2);
    }
    monster.y=Math.round(random(50,340));
    monster.velocityX=-(8+score/10);
    monster.setLifetime=100;
    
    enemyGroup.add(monster);
    
  }
}
