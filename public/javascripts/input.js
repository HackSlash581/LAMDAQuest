function checkInput(mainGame) {
	if(mainGame.cursors.up.isDown) {
    mainGame.player.body.velocity.y -= 50;
  }
  else if(mainGame.cursors.down.isDown) {
    mainGame.player.body.velocity.y += 50;
  }
  if(mainGame.cursors.left.isDown) {
    mainGame.player.body.velocity.x -= 50;
  }
  else if(mainGame.cursors.right.isDown) {
    mainGame.player.body.velocity.x += 50;
  }
}

function initInput(mainGame) {
  mainGame.cursors = mainGame.game.input.keyboard.createCursorKeys();
}