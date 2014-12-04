var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.boot = function(){};

LAMDAQuest.boot.prototype = {
  create: function() {
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //this.scale.pageAlignHorizontally = true;
    //this.scale.pageAlignVertically = true;

    //this.scale.setScreenSize(true);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('preload');
  }
};
