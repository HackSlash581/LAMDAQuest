define([
  'phaser', 
  'LAMDAQuest',
  'menus/pauseMenu',
  'entities/player'
], function(Phaser, LAMDAQuest, pauseMenu, player) {
  var LQ = LAMDAQuest.getLQ();
  var input = (function() {

    return {
      checkInput: function() {
        if(LQ.wasd.up.isDown) {
          LQ.player.body.velocity.y -= LQ.player.speed;
          LQ.player.facing = "up";

          if(LQ.player.weapon == "bow"){
            LQ.player.animations.play('up_bow');         
          }
          else if(LQ.player.weapon == "spear"){
            LQ.player.animations.play("up_spear");
          }
          else
            LQ.player.animations.play('up_unarmed');

            LQ.player.animating = false;
        }
        else if(LQ.wasd.down.isDown) {
          LQ.player.body.velocity.y += LQ.player.speed;
          LQ.player.facing = "down";
          if(LQ.player.weapon == "bow"){
            LQ.player.animations.play('down_bow');         
          }
          else if(LQ.player.weapon == "spear"){
            LQ.player.animations.play("down_spear");
          }
          else
            LQ.player.animations.play('down_unarmed');

          LQ.player.animating = false;
        }
        if(LQ.wasd.left.isDown) {
          LQ.player.body.velocity.x -= LQ.player.speed;
          LQ.player.facing = "left";
          if(LQ.player.weapon == "bow"){
            LQ.player.animations.play('left_bow');         
          }
          else if(LQ.player.weapon == "spear"){
            LQ.player.animations.play("left_spear");
          }
          else
            LQ.player.animations.play('left_unarmed');

          LQ.player.animating = false;
        }
      else if(LQ.wasd.right.isDown) {
        LQ.player.body.velocity.x += LQ.player.speed;
        LQ.player.facing = "right";
        if(LQ.player.weapon == "bow"){
          LQ.player.animations.play('right_bow');         
        }
        else if(LQ.player.weapon == "spear"){
          LQ.player.animations.play('right_spear');
        }
        else
          LQ.player.animations.play('right_unarmed'); 
        
        LQ.player.animating = false;
      }

      //item switch
      if(LQ.items.bow.isDown && LQ.player.hasBow){
        LQ.player.weapon = "bow";
      }
      else if(LQ.items.spear.isDown && LQ.player.hasSpear){
        LQ.player.weapon = "spear";
      }

      //attack function
      if(LQ.game.input.activePointer.isDown){
        if(LQ.player.weapon == "unarmed")
          return;

        LQ.player.animating = true;

        var x_diff = LQ.game.input.activePointer.worldX - LQ.player.x;
        var y_diff = LQ.game.input.activePointer.worldY - LQ.player.y;

        if(Math.abs(x_diff) > Math.abs(y_diff)){
          if(x_diff > 0){
            LQ.player.facing = "right";
          }
          else if(x_diff < 0){
            LQ.player.facing = "left";
          }
        }
        else
        {
          if(y_diff > 0){
            LQ.player.facing = "down";        
          }  
          else if(y_diff < 0){
            LQ.player.facing = "up"; 
          }
        }
        player.attack();
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
          else if(LQ.player.weapon == "bow"){
            LQ.player.frame = 156;     
          }
          else
            LQ.player.frame = 39;
        }

        if(LQ.player.facing == "down"){
          if(LQ.player.weapon == "spear"){
            LQ.player.frame = 130;            
          }
          else if(LQ.player.weapon == "bow"){
            LQ.player.frame = 182;     
          }
          else
            LQ.player.frame = 0;
        }
        if(LQ.player.facing == "left"){
          if(LQ.player.weapon == "spear"){
            LQ.player.frame = 117;            
          }
          else if(LQ.player.weapon == "bow"){
            LQ.player.frame = 169;     
          }          
          else
            LQ.player.frame = 26;
        }
        if(LQ.player.facing == "right"){
          if(LQ.player.weapon == "spear"){
            LQ.player.frame = 143;            
          }
          else if(LQ.player.weapon == "bow"){
            LQ.player.frame = 195;     
          }
          else
            LQ.player.frame = 13;
        }
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

        LQ.items = {
          bow: LQ.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
          spear: LQ.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
        };

        LQ.wasd.space.onDown.add(pauseMenu.pauseGame, LQ);
      }
    };
  }());

  return input;
});

