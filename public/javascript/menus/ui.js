var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.UI = (function() {
  
  //private variables and methods would go here

  return {
    //public methods
    createMyButton: function(mainGame) {
      var actionOnClick = function() {
        console.log(mainGame)
      };
      var over = function() {
        console.log(mainGame)
      };
      var up = function() {};
      var out = function() {};

      mainGame.myButton = mainGame.game.add.button(
        LAMDAQuest.globals.width,
        LAMDAQuest.globals.height,
        'button', actionOnClick, mainGame, 2, 1, 0
      );

      mainGame.myButton.fixedToCamera = true;
      mainGame.myButton.scale.setTo(0.60, 0.60);
      mainGame.myButton.anchor.setTo(1,1);
      mainGame.myButton.onInputOver.add(over, mainGame);
      mainGame.myButton.onInputOut.add(out, mainGame);
      mainGame.myButton.onInputUp.add(up, mainGame);
    }

    //other UI initialization
  };
})();
