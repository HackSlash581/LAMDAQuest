function initMap(mainGame) {
  mainGame.map = mainGame.game.add.tilemap('level1');
  mainGame.map.addTilesetImage('tiles', 'sygma_dwtileset2');
  mainGame.backgroundlayer = mainGame.map.createLayer('BackgroundLayer');
  mainGame.environmentLayer = mainGame.map.createLayer('EnvironmentLayer');
  mainGame.map.setCollisionBetween(1205, 1755, true, 'EnvironmentLayer');
  mainGame.backgroundlayer.resizeWorld();
}

function putPlayerOnMap(mainGame) {
  var result = mainGame.findObjectsByType('playerStart', mainGame.map, 'GameEntities');
  mainGame.player = mainGame.game.add.sprite(result[0].x, result[0].y, 'player');
  mainGame.game.physics.arcade.enable(mainGame.player);
  mainGame.game.camera.follow(mainGame.player);
}