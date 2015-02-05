var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.pauseMenu = function() {
  
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

  function testPausedInput(event) {
      console.log("Player clicked during pause!");
  }

  return {
    // public methods
    pauseGame: function(mainGame) {
      if(!mainGame.game.paused) {
        mainGame.game.paused = true;
        displayMenu(mainGame.game);
        /********Need to do this for each scriptable entity*********/
        this.player.bringToTop();
        this.player.alpha = 0;
        this.player.pauseTween = mainGame.game.add.tween(this.player).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        this.player.inputEnabled = true;
        this.player.events.onInputDown.add(function() {
          console.log("Player clicked during pause!");
        }, this);
        /***********************************************************/
      } else {
        mainGame.game.paused = false;
        darkRectangle.destroy();
        //Stop the tweens for each entity
        this.player.pauseTween.stop();
        this.player.events.onInputDown.remove(testPausedInput, this);
        this.player.alpha = 1;
      }
    }
  };
}();