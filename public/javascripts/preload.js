var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.preload = function(){};

LAMDAQuest.preload.prototype = {
  preload: function() {
    this.load.tilemap(
      'level1', 
      0,
      'assets/tilemaps/tilemap1.json', 
      Phaser.Tilemap.TILED_JSON
    );

    this.load.image('sygma_dwtileset2', 'assets/sygma_dwtileset2.png');
  },

  create: function() {
    this.state.start('mainGame');
  }
};