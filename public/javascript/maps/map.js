define(['LAMDAQuest'], function(LAMDAQuest) {
  var LQ = LAMDAQuest.getLQ();
  var map = (function() {
    return {
      initMap: function() {
        LQ.map = LQ.game.add.tilemap('level1');
        LQ.map.addTilesetImage('tiles');
        LQ.map.addTilesetImage('Ground 2');
        LQ.map.addTilesetImage('Dungeon1', 'Ground_1');
        LQ.map.addTilesetImage('Dungeon2', 'Ground 3');
        LQ.layer = LQ.map.createLayer('Background');
        LQ.blue_flame = LQ.game.add.sprite(3120, 1568, 'blue_flame');
        LQ.game.physics.arcade.enable(LQ.blue_flame);
        LQ.doors = LQ.map.createLayer('Doors');
        LQ.environmentLayer = LQ.map.createLayer('GameEntities');
        LQ.map.setCollisionBetween(0, 220, true, LQ.environmentLayer, false);
        LQ.map.setCollisionBetween(392, 393, true, LQ.doors, false);
        LQ.map.setCollisionBetween(408, 409, true, LQ.doors, false);
        LQ.map.setCollision([622], true, LQ.environmentLayer, false);
        LQ.layer.resizeWorld();
      },

      findObjectsByType: function(type, map, layer) {
        var result = [];
        map.objects[layer].forEach(function(element){
          if(element.properties.type === type) {
            element.y -= map.tileHeight;
            result.push(element);
          }      
        });
        return result;
      }
    };
  }());

  return map;
});
