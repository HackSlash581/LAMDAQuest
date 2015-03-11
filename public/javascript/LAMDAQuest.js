define(['phaser', 'states/boot'], function(Phaser, boot) {
  'use strict';

  function LAMDAQuest() {
    this.globals = {
      "width": 800,
      "height": 600,
      "paused": false
    };
  };

  LAMDAQuest.prototype = {
    
    start: function() {
      var state;

      this.game = new Phaser.Game(this.globals.width, this.globals.height,
        Phaser.AUTO, 'gameDiv');

      state = this.game.state;
      state.add('boot', boot);
      state.add('preload', preload);
      state.add('menuState', menuState);
      state.add('tutorial', tutorial);
      state.add('gameOver', gameOver);
      state.start('boot');
    }
  }

  LAMDAQuest.prototype.constructor = LAMDAQuest;

  return LAMDAQuest;
});