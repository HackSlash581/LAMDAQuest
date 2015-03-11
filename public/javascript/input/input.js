define([
  'phaser', 
  'LAMDAQuest',
  'menus/pauseMenu'
], function(Phaser, LAMDAQuest, pauseMenu) {
  var LQ = LAMDAQuest.getLQ();
  var input = (function() {
    var wasdActive;
    var spaceActive;

    return {
      checkInput: function() {
        if(LQ.wasd.up.isDown) {
          LQ.player.body.velocity.y -= LQ.player.speed;
          LQ.player.facing = "up";
          if(LQ.player.weapon == "unarmed"){
            LQ.player.animations.play('up_unarmed');         
          }
          else if(LQ.player.weapon == "spear"){
            LQ.player.animations.play("up_spear");
          }
          LQ.player.animating = false;
        }
        else if(LQ.wasd.down.isDown) {
          LQ.player.body.velocity.y += LQ.player.speed;
          LQ.player.facing = "down";
          if(LQ.player.weapon == "unarmed"){
            LQ.player.animations.play('down_unarmed');         
          }
          else if(LQ.player.weapon == "spear"){
            LQ.player.animations.play("down_spear");
          }
          LQ.player.animating = false;

        }
        if(LQ.wasd.left.isDown) {
          LQ.player.body.velocity.x -= LQ.player.speed;
          LQ.player.facing = "left";
          if(LQ.player.weapon == "unarmed"){
            LQ.player.animations.play('left_unarmed');         
          }
          else if(LQ.player.weapon == "spear"){
            LQ.player.animations.play("left_spear");
          }
          LQ.player.animating = false;
        }
        else if(LQ.wasd.right.isDown) {
          LQ.player.body.velocity.x += LQ.player.speed;
          LQ.player.facing = "right";

          if(LQ.player.weapon == "unarmed"){
            LQ.player.animations.play('right_unarmed');
          }
          else if(LQ.player.weapon == "spear"){
            LQ.player.animations.play('right_spear');
          } 
          LQ.player.animating = false;
        }

        //attack function
        if(LQ.game.input.activePointer.isDown){
          if(LQ.player.weapon == "unarmed")
            return;

          LQ.player.animating = true;

          var x_diff = LQ.input.activePointer.worldX - LQ.player.x;
          var y_diff = LQ.input.activePointer.worldY - LQ.player.y;

          if(Math.abs(x_diff) > Math.abs(y_diff)){
            if(x_diff > 0){
              LQ.player.facing = "right";
              if(LQ.player.ammo > 1){
                LQ.player.animations.play('shoot_right');       
                LQ.throwSpear();              
              } 
              else{
                LQ.player.animations.play('stab_right');
              }
            }
            else if(x_diff < 0){
              LQ.player.facing = "left";
              if(LQ.player.ammo > 1){
                LQ.player.animations.play('shoot_left');       
                LQ.throwSpear();              
              } 
              else{
                LQ.player.animations.play('stab_left');
              }
            }
          }
          else
          {
            if(y_diff > 0){
              LQ.player.facing = "down";
              if(LQ.player.ammo > 1){
                LQ.player.animations.play('shoot_down');       
                LQ.throwSpear();              
              } 
              else{
                LQ.player.animations.play('stab_down');
              }            
            }  
            else if(y_diff < 0){
              LQ.player.facing = "up"; 
              if(LQ.player.ammo > 1){
                LQ.player.animations.play('shoot_up');       
                LQ.throwSpear();              
              } 
              else{
                LQ.player.animations.play('stab_up');
              }
            }
          }
          //when attack animation is finished set animating state back to false
          LQ.player.events.onAnimationComplete.add(function(){
            LQ.player.animating = false;
          }, this);   

        }

        //will need better logic here when adding attacks and other animations
        if(!LQ.wasd.up.isDown &&
           !LQ.wasd.down.isDown &&
           !LQ.wasd.left.isDown &&
           !LQ.wasd.right.isDown &&
           !LQ.player.animating)
        {
          LQ.player.animations.stop();
          if(LQ.player.facing == "up"){
            if(LQ.player.weapon == "spear"){
              LQ.player.frame = 104;            
            }
            else
              LQ.player.frame = 39;
          }

          if(LQ.player.facing == "down"){
            if(LQ.player.weapon == "spear"){
              LQ.player.frame = 130;            
            }
            else
              LQ.player.frame = 0;
          }
          if(LQ.player.facing == "left"){
            if(LQ.player.weapon == "spear"){
              LQ.player.frame = 117;            
            }
            else
              LQ.player.frame = 26;
          }
          if(LQ.player.facing == "right"){
            if(LQ.player.weapon == "spear"){
              LQ.player.frame = 143;            
            }
            else
              LQ.player.frame = 13;
          }
        }
      },

      // We have to do this so typing w a s or d inputs the corresponding
      // characters during the pause screen
      toggleWASDCapture: function() {
        if(wasdActive) {
          LQ.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.W);
          LQ.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);
          LQ.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.A);
          LQ.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
          wasdActive = false;
        } else {
          LQ.game.input.keyboard.addKeyCapture(Phaser.Keyboard.W);
          LQ.game.input.keyboard.addKeyCapture(Phaser.Keyboard.S);
          LQ.game.input.keyboard.addKeyCapture(Phaser.Keyboard.A);
          LQ.game.input.keyboard.addKeyCapture(Phaser.Keyboard.D);
          wasdActive = true;
        }
      },

      toggleSpaceCapture: function() {
        if(spaceActive) {
          LQ.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);
          spaceActive = false;
        } else {
          LQ.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
          spaceActive = true;
        }
      },
      
      initInput: function() {
        LQ.wasd = {
          up: LQ.game.input.keyboard.addKey(Phaser.Keyboard.W),
          down: LQ.game.input.keyboard.addKey(Phaser.Keyboard.S),
          left: LQ.game.input.keyboard.addKey(Phaser.Keyboard.A),
          right: LQ.game.input.keyboard.addKey(Phaser.Keyboard.D),
          space: LQ.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };
        
        wasdActive = true;
        spaceActive = true;
        LQ.wasd.space.onDown.add(pauseMenu.pauseGame, LQ);
      }
    };
  }());

  return input;
});

