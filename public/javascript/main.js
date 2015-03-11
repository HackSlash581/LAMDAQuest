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

  require(['phaser', 'LAMDAQuest'], function(Phaser, LAMDAQuest) {
    var LQ = new LAMDAQuest();
    LQ.start();
  });
}());
