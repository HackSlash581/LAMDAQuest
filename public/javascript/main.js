(function() {
  'use strict';

  requirejs.config({
    baseUrl: "public/javascript",

    paths: {
      phaser: "3rdPary/Phaser/phaser.min"
    },

    shim: {
      'phaser': {
        exports: 'Phaser'
      }
    }
  });

  require([
    'phaser', 
    'LAMDAQuest',
    'states/boot',
    'states/gameOver',
    'states/menuState',
    'states/preload',
    'states/tutorial'
  ], function(Phaser, LAMDAQuest, boot, gameOver, menuState, preload, tutorial) {
    
    LAMDAQuest.game = new Phaser.Game(LAMDAQuest.globals.width, LAMDAQuest.globals.height, Phaser.AUTO, 'gameDiv');
    var state = LAMDAQuest.game.state;
    state.add('boot', boot);
    state.add('preload', preload);
    state.add('menuState', menuState);
    state.add('tutorial', tutorial);
    state.add('gameOver', gameOver);
    state.start('boot');
  });
}());
