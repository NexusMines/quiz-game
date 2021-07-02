class Quiz {
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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    this.title.hide();
    this.input1.hide();
    this.button.hide();
    this.input2.hide();

    background("yellow");
    
    fill("black");
    textSize(30);
    text("Result of the quiz.", 340, 50);

    contestant.getContestantInfo();

    if(allContestants != undefined) {
      fill("black");
      textSize(20);
      text("Note: Contestant who answered correct are highlighted in green color.", 130, 230)
    }
    
    for (var plr in allContestants){
      var correctans = "2";
      if (correctans === allContestants[plr].answer)
      fill("Green")
      else
      fill("red")
    }
  }
}
