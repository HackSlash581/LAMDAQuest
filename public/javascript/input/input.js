var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.INPUT = function() {
  
  return {
    checkInput: function(mainGame) {
    	if(mainGame.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        mainGame.player.body.velocity.y -= 50;
      }
      else if(mainGame.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        mainGame.player.body.velocity.y += 50;
      }
      if(mainGame.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        mainGame.player.body.velocity.x -= 50;
      }
      else if(mainGame.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        mainGame.player.body.velocity.x += 50;
      }
    },
    
    initInput: function(mainGame) {
      //mainGame.cursors = mainGame.game.input.keyboard.createCursorKeys();
    }
  };
}();