var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.INPUT = (function() {
  
  var wasdActive;
  var spaceActive;

  return {
    checkInput: function(mainGame) {
      if(mainGame.wasd.up.isDown) {
        mainGame.player.body.velocity.y -= mainGame.player.speed;
        mainGame.player.facing = "up";
        if(mainGame.player.weapon == "unarmed"){
          mainGame.player.animations.play('up_unarmed');         
        }
        else if(mainGame.player.weapon == "spear"){
          mainGame.player.animations.play("up_spear");
        }
        mainGame.player.animating = false;
      }
      else if(mainGame.wasd.down.isDown) {
        mainGame.player.body.velocity.y += mainGame.player.speed;
        mainGame.player.facing = "down";
        if(mainGame.player.weapon == "unarmed"){
          mainGame.player.animations.play('down_unarmed');         
        }
        else if(mainGame.player.weapon == "spear"){
          mainGame.player.animations.play("down_spear");
        }
        mainGame.player.animating = false;

      }
      if(mainGame.wasd.left.isDown) {
        mainGame.player.body.velocity.x -= mainGame.player.speed;
        mainGame.player.facing = "left";
        if(mainGame.player.weapon == "unarmed"){
          mainGame.player.animations.play('left_unarmed');         
        }
        else if(mainGame.player.weapon == "spear"){
          mainGame.player.animations.play("left_spear");
        }
        mainGame.player.animating = false;
      }
      else if(mainGame.wasd.right.isDown) {
        mainGame.player.body.velocity.x += mainGame.player.speed;
        mainGame.player.facing = "right";

        if(mainGame.player.weapon == "unarmed"){
          mainGame.player.animations.play('right_unarmed');
        }
        else if(mainGame.player.weapon == "spear"){
          mainGame.player.animations.play('right_spear');
        } 
        mainGame.player.animating = false;
      }

      //attack function
      if(mainGame.input.activePointer.isDown){
        if(mainGame.player.weapon == "unarmed")
          return;

        mainGame.player.animating = true;

        var x_diff = mainGame.input.activePointer.worldX - mainGame.player.x;
        var y_diff = mainGame.input.activePointer.worldY - mainGame.player.y;

        if(Math.abs(x_diff) > Math.abs(y_diff)){
          if(x_diff > 0){
            mainGame.player.facing = "right";
            if(mainGame.player.ammo > 1){
              mainGame.player.animations.play('shoot_right');       
              mainGame.throwSpear();              
            } 
            else{
              mainGame.player.animations.play('stab_right');
            }
          }
          else if(x_diff < 0){
            mainGame.player.facing = "left";
            if(mainGame.player.ammo > 1){
              mainGame.player.animations.play('shoot_left');       
              mainGame.throwSpear();              
            } 
            else{
              mainGame.player.animations.play('stab_left');
            }
          }
        }
        else
        {
          if(y_diff > 0){
            mainGame.player.facing = "down";
            if(mainGame.player.ammo > 1){
              mainGame.player.animations.play('shoot_down');       
              mainGame.throwSpear();              
            } 
            else{
              mainGame.player.animations.play('stab_down');
            }            
          }  
          else if(y_diff < 0){
            mainGame.player.facing = "up"; 
            if(mainGame.player.ammo > 1){
              mainGame.player.animations.play('shoot_up');       
              mainGame.throwSpear();              
            } 
            else{
              mainGame.player.animations.play('stab_up');
            }
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
        if(mainGame.player.facing == "up"){
          if(mainGame.player.weapon == "spear"){
            mainGame.player.frame = 104;            
          }
          else
            mainGame.player.frame = 39;
        }

        if(mainGame.player.facing == "down"){
          if(mainGame.player.weapon == "spear"){
            mainGame.player.frame = 130;            
          }
          else
            mainGame.player.frame = 0;
        }
        if(mainGame.player.facing == "left"){
          if(mainGame.player.weapon == "spear"){
            mainGame.player.frame = 117;            
          }
          else
            mainGame.player.frame = 26;
        }
        if(mainGame.player.facing == "right"){
          if(mainGame.player.weapon == "spear"){
            mainGame.player.frame = 143;            
          }
          else
            mainGame.player.frame = 13;
        }
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
        space: mainGame.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      };
      
      wasdActive = true;
      spaceActive = true;
      mainGame.wasd.space.onDown.add(LAMDAQuest.PAUSE.pauseGame, mainGame);
    }
  };
})();