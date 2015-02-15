var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.mainGame = function() {};
LAMDAQuest.mainGame.prototype = {
  create: function() {
    //Initialize the map
    LAMDAQuest.MAP.initMap(this);

    //Initialize player on the map
    LAMDAQuest.MAP.putPlayerOnMap(this);

    //Initialize UI
    LAMDAQuest.UI.createMyButton(this);
    
    //Initialize input
    LAMDAQuest.INPUT.initInput(this);

    //add beaver enemy to game
    this.enemy = this.game.add.sprite(60, 5, 'enemy');
    this.game.physics.arcade.enable(this.enemy);

    //adding player animations
    this.player.animations.add('right', [5,6,7,8,9], 8, true);
    this.player.animations.add('left', [0,1,2,3,4], 8, true);
    this.player.animations.add('up', [10,11,12,13,14], 8, true);
    this.player.animations.add('down', [15,16,17,18,19], 8, true);

    //default facing direction is down
    this.player.facing = "down";
  },

  update: function() {
    if(!LAMDAQuest.globals.paused) {
      //TODO:  Move to player.js
      this.player.body.velocity.y = 0;
      this.player.body.velocity.x = 0;
  
      //Check player input
      LAMDAQuest.INPUT.checkInput(this);
  
      this.game.physics.arcade.collide(this.player, this.environmentLayer);
      //if player and enemy overlap, call playerDie function
      this.game.physics.arcade.overlap(this.player, this.enemy, this.playerDie, null, this);
    } else {
      //Scripting menu updates
    }
  },

  pauseUpdate: function() {
    this.player.pauseTween.update();

  },

  playerDie: function(){
    this.game.state.start('gameOver');
    
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