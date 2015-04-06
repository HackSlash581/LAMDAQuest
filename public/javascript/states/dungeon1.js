define([
  'phaser',
  'LAMDAQuest',
  'entities/player',
  'input/input'
  ], function(Phaser, LAMDAQuest, player, input) {
  var LQ = LAMDAQuest.getLQ();

  var dungeon1 = function() {};
  dungeon1.prototype = {
    create: function() {

      LQ.map = LQ.game.add.tilemap('dungeon1');
      LQ.map.addTilesetImage('Dungeon', 'Ground 3');
      LQ.map.addTilesetImage('Dungeon2', 'Ground_1');
      LQ.traversableLayer = LQ.map.createLayer('Traversable');
      LQ.collisionLayer = LQ.map.createLayer('CollisionLayer');
      LQ.map.setCollision([401], true, LQ.collisionLayer, false);
      LQ.traversableLayer.resizeWorld();

      player.createPlayer();
      input.initInput();

    },

    update: function() {
      player.updatePlayer();
      input.checkInput();

      LQ.game.physics.arcade.collide(LQ.player, LQ.collisionLayer);
    }
  };


  return dungeon1;
});