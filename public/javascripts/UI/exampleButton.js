function createMyButton(mainGame) {
  var actionOnClick = function() {console.log(mainGame)};
  mainGame.myButton = mainGame.game.add.button(200, 400, 'button', actionOnClick, mainGame, 2, 1, 0);
  
  function over() {console.log(mainGame)};
  function up() {};
  function out() {};

  mainGame.myButton.onInputOver.add(over, mainGame);
  mainGame.myButton.onInputOut.add(out, mainGame);
  mainGame.myButton.onInputUp.add(up, mainGame);
}
