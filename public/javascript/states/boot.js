var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.boot = function() {};
LAMDAQuest.boot.prototype = {
  
  init: function() {
    //We don't need to support multi-touch
    this.input.maxPointers = 1;
  },

  preload: function() {
    this.game.load.image('progressBar', 'assets/menus/progressBar.png');
  },

  create: function() {
    this.game.stage.backgroundColor = '#003366';

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	  this.scale.maxWidth = LAMDAQuest.globals.width;
	  this.scale.maxHeight = LAMDAQuest.globals.height;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    

    this.state.start('preload');
  }
};
