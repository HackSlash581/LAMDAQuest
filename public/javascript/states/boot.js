define(['phaser', 'LAMDAQuest'], function(Phaser, LAMDAQuest) {
  var LQ = LAMDAQuest.getLQ();
  
  var boot = function() {};
  boot.prototype = {
    init: function() {
      //We don't need to support multi-touch
      this.input.maxPointers = 1;
    },

    preload: function() {
      this.game.load.image('progressBar', 'assets/menus/progressBar.png');
    },

    create: function() {
      var scale = this.game.scale;

      this.game.stage.backgroundColor = '#003366';

      scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      scale.maxWidth = LQ.globals.width;
      scale.maxHeight = LQ.globals.height;
      scale.pageAlignHorizontally = true;
      scale.pageAlignVertically = true;
      scale.setScreenSize(true);

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.state.start('preload');
    }
  };

  return boot;
});