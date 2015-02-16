var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.PLAYER = (function() {


  return {
    createPlayer: function(mainGame) {
      var result = mainGame.findObjectsByType('playerStart', mainGame.map, 'GameEntities');
      mainGame.player = mainGame.game.add.sprite(result[0].x, result[0].y, 'player');
      mainGame.player.displayName = "Steve";
      mainGame.player.speed = 75;
      mainGame.game.physics.arcade.enable(mainGame.player);
      mainGame.game.camera.follow(mainGame.player);

      mainGame.player.animations.add('right', [5,6,7,8,9], 8, true);
      mainGame.player.animations.add('left', [0,1,2,3,4], 8, true);
      mainGame.player.animations.add('up', [10,11,12,13,14], 8, true);
      mainGame.player.animations.add('down', [15,16,17,18,19], 8, true);

      mainGame.player.facing = "down";
    },

    updatePlayer: function(mainGame) {
      mainGame.player.body.velocity.y = 0;
      mainGame.player.body.velocity.x = 0;
    }
  };
})();