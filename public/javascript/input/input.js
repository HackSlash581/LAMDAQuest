var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.INPUT = function() {
  
  return {
    checkInput: function(mainGame) {
    	if(mainGame.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        mainGame.player.body.velocity.y -= 50;
        mainGame.player.animations.play('up');
        mainGame.player.facing = "up";
      }
      else if(mainGame.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        mainGame.player.body.velocity.y += 50;
        mainGame.player.animations.play('down');
        mainGame.player.facing = "down";
      }
      if(mainGame.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        mainGame.player.body.velocity.x -= 50;
        mainGame.player.animations.play('left');
        mainGame.player.facing = "left";
      }
      else if(mainGame.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        mainGame.player.body.velocity.x += 50;
        mainGame.player.animations.play('right');
        mainGame.player.facing = "right";
      }

      if(mainGame.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        //TODO:  Save all necessary info before changing states
        mainGame.game.state.start('pause');
      }

      //will need better logic here when adding attacks and other animations
      if(!mainGame.game.input.keyboard.isDown(Phaser.Keyboard.W) &&
         !mainGame.game.input.keyboard.isDown(Phaser.Keyboard.S) &&
         !mainGame.game.input.keyboard.isDown(Phaser.Keyboard.A) &&
         !mainGame.game.input.keyboard.isDown(Phaser.Keyboard.D) )
      {
        mainGame.player.animations.stop();
        if(mainGame.player.facing == "up")
          mainGame.player.frame = 10;
        if(mainGame.player.facing == "down")
          mainGame.player.frame = 15;
        if(mainGame.player.facing == "left")
          mainGame.player.frame = 0;
        if(mainGame.player.facing == "right")
          mainGame.player.frame = 5;
      }
    },
    
    initInput: function(mainGame) {
      //mainGame.cursors = mainGame.game.input.keyboard.createCursorKeys();
    }
  };
}();