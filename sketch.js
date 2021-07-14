var dog, dogIMG, happyDogIMG, foodS, foodStock

function preload()
{
	dogIMG = loadImage("images/dogIMG.png");
  happyDogIMG = loadImage("images/dogIMG1.png");
}

function setup() {
  database = firebase.database()
	createCanvas(500, 500);
  dog = createSprite(400, 400, 20, 20);
  dog.addImage(dogIMG);
  dog.scale = 0.2

  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  
}


function draw() {
  background(46, 139, 87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDogIMG);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("red");
  stroke("orange");
  text("food left: " + foodS, 10, 150);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0
  }else{
    x = x-1
  }

  database.ref("/").update({
    food:x
  })
}



