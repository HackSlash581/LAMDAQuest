var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.PAUSE = function() {
  
  // private variable  
  var darkRectangle;

  // private method
  function displayMenu(game) {
    darkRectangle = game.add.graphics(0, 0);
    darkRectangle.lineStyle(1, 0x000000, 0.3);
    darkRectangle.beginFill(0x000000, 0.3);
    darkRectangle.drawRect(game.camera.x, game.camera.y, game.camera.width, game.camera.height);
    darkRectangle.endFill();
  }

  function testPausedInput(player) {
    $('#scriptingModal').modal();
  }

  // TODO: This should be in input.js
  function clearInput(mainGame) {
    mainGame.wasd.up.isDown = false;
    mainGame.wasd.down.isDown = false;
    mainGame.wasd.right.isDown = false;
    mainGame.wasd.left.isDown = false;
  }

  // TODO: This should be in player.js
  function freezePlayer(player) {
    player.animations.stop();
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
  }
  

  return {
    // public methods
    pauseGame: function(event) {
      if(!LAMDAQuest.globals.paused) {
        LAMDAQuest.globals.paused = true;
        clearInput(this);
        displayMenu(this.game);
        // Pause everything else we eventually add (projectiles, etc.)

        /********Need to do this for each scriptable entity*********/
        freezePlayer(this.player);
        this.player.bringToTop();
        this.player.alpha = 0;
        this.player.pauseTween = this.game.add.tween(this.player).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        this.player.inputEnabled = true;
        this.player.events.onInputDown.add(testPausedInput, this);
        /***********************************************************/
      } else {
        LAMDAQuest.globals.paused = false;
        darkRectangle.destroy();
        //Stop the tweens for each entity
        this.player.pauseTween.stop();
        this.player.inputEnabled = false;
        this.player.events.onInputDown.remove(testPausedInput, this);
        this.player.alpha = 1;
      }
    }
  };
}();