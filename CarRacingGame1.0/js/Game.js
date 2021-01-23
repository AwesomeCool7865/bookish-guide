class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 200, 20, 20)
    car2 = createSprite(150, 200, 20, 20)
    car3 = createSprite(200, 200, 20, 20)
    car4 = createSprite(250, 200, 20, 20)

    allCars= [car1, car2, car3, car4]
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var display_position = 130;
      var index=0;
      var x=0;
      var y;
      for(var plr in allPlayers){
        index= index+1
        x = x+200; 
        y = allPlayers[plr].distance;
        allCars[index-1].x=x
        allCars[index-1].y=y

        if (index === player.index) {
          allCars[index-1].shapeColor= 'red';
        }
      /*  if (plr === "player" + player.index)
          fill("red")
        else

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        */
      }
    }
          fill("black");


    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites()
  }
}