var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.MAP = (function() {
  
  return {
    initMap: function(mainGame) {
      mainGame.map = mainGame.game.add.tilemap('level1');
      mainGame.map.addTilesetImage('tiles');
      mainGame.layer = mainGame.map.createLayer('Background');
	  mainGame.environmentLayer = mainGame.map.createLayer('GameEntities');
	  mainGame.map.setCollisionBetween(0, 220, true, mainGame.environmentLayer, false);
      mainGame.layer.resizeWorld();
    },
    
    putPlayerOnMap: function(mainGame) {
    }
  };
})();