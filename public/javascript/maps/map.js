var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.MAP = (function() {
  
  return {
    initMap: function(mainGame) {
      mainGame.map = mainGame.game.add.tilemap('level1');
      mainGame.map.addTilesetImage('tiles');
      mainGame.map.addTilesetImage('Ground 2');
      mainGame.layer = mainGame.map.createLayer('Background');
      mainGame.layer = mainGame.map.createLayer('Doors');
	  mainGame.environmentLayer = mainGame.map.createLayer('GameEntities');
	  mainGame.map.setCollisionBetween(0, 220, true, mainGame.environmentLayer, false);
      mainGame.layer.resizeWorld();
    },
    
    putPlayerOnMap: function(mainGame) {
    }
  };
})();