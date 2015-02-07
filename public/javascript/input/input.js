var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.INPUT = function() {
  
  return {
    checkInput: function(mainGame) {
      if(mainGame.wasd.up.isDown) {
        mainGame.player.body.velocity.y -= mainGame.player.speed;
        mainGame.player.animations.play('up');
        mainGame.player.facing = "up";
      }
      else if(mainGame.wasd.down.isDown) {
        mainGame.player.body.velocity.y += mainGame.player.speed;
        mainGame.player.animations.play('down');
        mainGame.player.facing = "down";
      }
      if(mainGame.wasd.left.isDown) {
        mainGame.player.body.velocity.x -= mainGame.player.speed;
        mainGame.player.animations.play('left');
        mainGame.player.facing = "left";
      }
      else if(mainGame.wasd.right.isDown) {
        mainGame.player.body.velocity.x += mainGame.player.speed;
        mainGame.player.animations.play('right');
        mainGame.player.facing = "right";
      }

      //will need better logic here when adding attacks and other animations
      if(!mainGame.wasd.up.isDown &&
         !mainGame.wasd.down.isDown &&
         !mainGame.wasd.left.isDown &&
         !mainGame.wasd.right.isDown )
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
      mainGame.wasd = {
        up: mainGame.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: mainGame.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: mainGame.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: mainGame.game.input.keyboard.addKey(Phaser.Keyboard.D),
        space: mainGame.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      };
      
      mainGame.wasd.space.onDown.add(LAMDAQuest.PAUSE.pauseGame, mainGame);
    }
  };
}();