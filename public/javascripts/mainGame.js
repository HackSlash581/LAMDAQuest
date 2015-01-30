var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.mainGame = function() {};
LAMDAQuest.mainGame.prototype = {
  create: function() {
    
    //Initialize the map
    initMap(this);

    //Initialize UI
    createMyButton(this);
    
    //Initialize player on the map
    putPlayerOnMap(this);

    //Initialize input
    initInput(this);
  },

  update: function() {
    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    //Check player input
    checkInput(this);

    this.game.physics.arcade.collide(this.player, this.environmentLayer);
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