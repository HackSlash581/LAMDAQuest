var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.tutorial = function() {};
LAMDAQuest.tutorial.prototype = {
  create: function() {

    LAMDAQuest.MAP.initMap(this);

    LAMDAQuest.PLAYER.createPlayer(this);

    LAMDAQuest.INPUT.initInput(this);

    this.messageData = LAMDAQuest.data.loadMessages();

    LAMDAQuest.SOUNDS.init(this);
    
    LAMDAQuest.TEXTBOX.createTextBox(this);
    LAMDAQuest.TEXTBOX.hideTextBox();

    

    setTimeout(this.triggerMessage("intro"), 4000);
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

  triggerMessage: function(key) {
    var text = this.getMessage(key);
    if(!LAMDAQuest.data.alreadySeen(key)) {
      LAMDAQuest.TEXTBOX.showMessage(text);
      LAMDAQuest.data.markAsRead(key);
    }
  },

  getMessage: function(key) {
    return this.messageData.tutorial[key];
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