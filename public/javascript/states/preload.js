var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.preload = function() {

};

LAMDAQuest.preload.prototype = {
  preload: function() {
    this.load.tilemap('level1', 'assets/tilemaps/tileMap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('player', 'assets/spriteSheets/player.png');
    this.load.image('tiles', 'assets/tilesets/tiles.png');
    this.load.spritesheet('button', 'assets/spriteSheets/button_sprite_sheet.png', 193, 71);
  },

  create: function() {
    this.state.start('mainGame');
  }
};