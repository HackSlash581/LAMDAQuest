var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.MAP = (function() {
  
  return {
    initMap: function(mainGame) {
      mainGame.map = mainGame.game.add.tilemap('level1');
      mainGame.map.addTilesetImage('tiles');
      mainGame.layer = mainGame.map.createLayer('Background');
	    mainGame.environmentLayer = mainGame.map.createLayer('GameEntities');
      mainGame.blue_flame = mainGame.game.add.sprite(3120, 1568, 'blue_flame');
      mainGame.game.physics.arcade.enable(mainGame.blue_flame);
	    mainGame.map.setCollisionBetween(0, 220, true, mainGame.environmentLayer, false);
      mainGame.layer.resizeWorld();
    }
  };
})();