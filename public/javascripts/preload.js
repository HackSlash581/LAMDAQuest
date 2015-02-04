var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.preload = function(){};

LAMDAQuest.preload.prototype = {
  preload: function() {
    this.load.tilemap('level1', 'assets/tilemaps/tilemap1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('player', 'assets/player_sprite_sheet.png', 32, 32);
    this.load.image('sygma_dwtileset2', 'assets/sygma_dwtileset2.png');
    this.load.image('background_menu', 'assets/background_menu.png');
    this.load.image('background_gameover', 'assets/background_gameover.jpg');
    this.load.image('enemy', 'assets/beaver.png');
  },

  create: function() {
    this.state.start('menuState');
  }
};