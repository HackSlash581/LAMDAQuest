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

      //adding player animations
      mainGame.player.animations.add('right', [143,144,145,146,147,148,149,150,151], 8, true);
      mainGame.player.animations.add('left', [117,118,119,120,121,122,123,124,125], 8, true);
      mainGame.player.animations.add('up', [104,105,106,107,108,109,110,111,112], 8, true);
      mainGame.player.animations.add('down', [130,131,132,133,134,135,136,137,138], 8, true);

      mainGame.player.animations.add('stab_right', [91,92,93,94,95,96,97,98], 12, false);
      mainGame.player.animations.add('stab_left', [65,66,67,68,69,70,71,72], 12, false);
      mainGame.player.animations.add('stab_up', [52,53,54,55,56,57,58,59], 12, false);
      mainGame.player.animations.add('stab_down', [78,79,80,81,82,83,84,85], 12, false);

      mainGame.player.animations.add('shoot_right', [247,248,249,250,251,252,253,254,255,256,257,258,259], 25, false);
      mainGame.player.animations.add('shoot_left', [221,222,223,224,225,226,227,228,229,230,231,232,233], 25, false);
      mainGame.player.animations.add('shoot_up', [208,209,210,211,212,213,214,215,216,217,218,219,220], 25, false);
      mainGame.player.animations.add('shoot_down', [234,235,236,237,238,239,240,241,242,243,244,245,246], 25, false);
   
      mainGame.player.animations.add('die', [260,261,262,263,264,265], 4, false);

      //default facing direction is down
      mainGame.player.facing = "down";
      mainGame.player.animating = false;
      mainGame.player.health = 100;
    },

    updatePlayer: function(mainGame) {
      mainGame.player.body.velocity.y = 0;
      mainGame.player.body.velocity.x = 0;
    }
  };
})();