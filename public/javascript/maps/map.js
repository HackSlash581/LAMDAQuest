var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.MAP = (function() {
  
  return {
    initMap: function(mainGame) {
      mainGame.map = mainGame.game.add.tilemap('level1');
      mainGame.map.addTilesetImage('tiles');
      mainGame.layer = mainGame.map.createLayer('layer1');
      mainGame.layer.resizeWorld();
    },
    
    putPlayerOnMap: function(mainGame) {
    }
  };
})();