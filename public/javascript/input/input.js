var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.INPUT = (function() {
  
  var wasdActive;
  var spaceActive;

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

      //attack function
      if(mainGame.input.activePointer.isDown){
        mainGame.player.animating = true;

        var x_diff = mainGame.player.x - mainGame.input.activePointer.x;
        var y_diff = mainGame.player.y - mainGame.input.activePointer.y;
        if(Math.abs(x_diff) > Math.abs(y_diff)){
          if(x_diff < 0){
            mainGame.player.animations.play('shoot_right');
            mainGame.player.facing = "right";          
            mainGame.fireArrow();

          }
          else if(x_diff > 0){
            mainGame.player.animations.play('shoot_left');
            mainGame.player.facing = "left";
            mainGame.fireArrow();
          }
        }
        else
        {
          if(y_diff < 0){
            mainGame.player.animations.play('shoot_down');
            mainGame.player.facing = "down";
            mainGame.fireArrow();
          }  
          else if(y_diff > 0){
            mainGame.player.animations.play('shoot_up');    
            mainGame.player.facing = "up"; 
            mainGame.fireArrow();
          }
        }
        //when attack animation is finished set animating state back to false
        mainGame.player.events.onAnimationComplete.add(function(){
          mainGame.player.animating = false;
        }, this);   

      }

      //will need better logic here when adding attacks and other animations
      if(!mainGame.wasd.up.isDown &&
         !mainGame.wasd.down.isDown &&
         !mainGame.wasd.left.isDown &&
         !mainGame.wasd.right.isDown &&
         !mainGame.player.animating)
      {
        mainGame.player.animations.stop();
        if(mainGame.player.facing == "up")
          mainGame.player.frame = 104;
        if(mainGame.player.facing == "down")
          mainGame.player.frame = 130;
        if(mainGame.player.facing == "left")
          mainGame.player.frame = 117;
        if(mainGame.player.facing == "right")
          mainGame.player.frame = 143;
      }
    },

    // We have to do this so typing w a s or d inputs the corresponding
    // characters during the pause screen
    toggleWASDCapture: function(mainGame) {
      if(wasdActive) {
        mainGame.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.W);
        mainGame.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);
        mainGame.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.A);
        mainGame.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
        wasdActive = false;
      } else {
        mainGame.game.input.keyboard.addKeyCapture(Phaser.Keyboard.W);
        mainGame.game.input.keyboard.addKeyCapture(Phaser.Keyboard.S);
        mainGame.game.input.keyboard.addKeyCapture(Phaser.Keyboard.A);
        mainGame.game.input.keyboard.addKeyCapture(Phaser.Keyboard.D);
        wasdActive = true;
      }
    },

    toggleSpaceCapture: function(mainGame) {
      if(spaceActive) {
        mainGame.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
        spaceActive = false;
      } else {
        mainGame.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
        spaceActive = true;
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
      
      wasdActive = true;
      spaceActive = true;
      mainGame.wasd.space.onDown.add(LAMDAQuest.PAUSE.pauseGame, mainGame);
    }
  };
})();