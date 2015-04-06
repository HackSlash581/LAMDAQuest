(function() {
  'use strict';

  requirejs.config({
    baseUrl: "javascript",

    paths: {
      phaser: "3rdParty/Phaser/phaser.min"
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
    'states/preload',
    'states/menuState',
    'states/tutorial',
    'states/gameOver',
    'states/dungeon1'
  ], function(Phaser, LAMDAQuest, boot, preload, menuState, tutorial, gameOver, dungeon1) {
    var state;
    var LQ = LAMDAQuest.getLQ();
    state = LQ.game.state;
    state.add('boot', boot);
    state.add('preload', preload);
    state.add('menuState', menuState);
    state.add('tutorial', tutorial);
    state.add('gameOver', gameOver);
    state.add('dungeon1', dungeon1);
    state.start('boot');
  });
}());
