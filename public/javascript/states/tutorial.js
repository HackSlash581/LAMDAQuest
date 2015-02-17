var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.tutorial = function() {};
LAMDAQuest.tutorial.prototype = {
  create: function() {

    LAMDAQuest.MAP.initMap(this);

    LAMDAQuest.PLAYER.createPlayer(this);

    LAMDAQuest.INPUT.initInput(this);

    LAMDAQuest.TEXT.createTextBox(this);
  },

  update: function() {
    
    if(!LAMDAQuest.globals.paused) {
      LAMDAQuest.PLAYER.updatePlayer(this);
      LAMDAQuest.INPUT.checkInput(this);
      this.game.physics.arcade.collide(this.player, this.environmentLayer);
      this.game.physics.arcade.overlap(this.player, this.enemy, this.playerDie, null, this);
    } else {
      //Scripting menu updates
    }
    
  },

  pauseUpdate: function() {
    //this.player.pauseTween.update();

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