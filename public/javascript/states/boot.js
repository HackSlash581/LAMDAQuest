define(['phaser', 'LAMDAQuest'], function(Phaser, LQ) {
  var boot = function() {};
  boot.prototype = {
    init: function() {
      //We don't need to support multi-touch
      LQ.input.maxPointers = 1;
    },

    preload: function() {
      LQ.game.load.image('progressBar', 'assets/menus/progressBar.png');
    },

    create: function() {
      var scale = LQ.scale;

      LQ.game.stage.backgroundColor = '#003366';

      scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      scale.maxWidth = LAMDAQuest.globals.width;
      scale.maxHeight = LAMDAQuest.globals.height;
      scale.pageAlignHorizontally = true;
      scale.pageAlignVertically = true;
      scale.setScreenSize(true);

      LQ.game.physics.startSystem(Phaser.Physics.ARCADE);

      LQ.state.start('preload');
    }
  }
  
  return boot;
});