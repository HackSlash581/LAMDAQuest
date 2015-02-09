var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.MAP = function() {
  
  return {
    initMap: function(mainGame) {
      mainGame.map = mainGame.game.add.tilemap('level1');
      mainGame.map.addTilesetImage('tiles');
      mainGame.layer = mainGame.map.createLayer('layer1');
      mainGame.layer.resizeWorld();
    },
    
    putPlayerOnMap: function(mainGame) {
      var result = mainGame.findObjectsByType('playerStart', mainGame.map, 'GameEntities');
      mainGame.player = mainGame.game.add.sprite(result[0].x, result[0].y, 'player');
      mainGame.player.displayName = "Steve";
      mainGame.player.speed = 75;
      mainGame.game.physics.arcade.enable(mainGame.player);
      mainGame.game.camera.follow(mainGame.player);
    }
  };
}();