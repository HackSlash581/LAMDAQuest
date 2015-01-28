var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.boot = function() {

};

LAMDAQuest.boot.prototype = {
  
  init: function() {

    //We don't need to support multi-touch
    this.input.maxPointers = 1;
  },

  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.scale.setScreenSize(true);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('preload');
  }
};
