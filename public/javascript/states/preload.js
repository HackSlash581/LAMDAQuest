var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.preload = function() {

};

LAMDAQuest.preload.prototype = {
  preload: function() {
    this.load.tilemap('level1', 'assets/tilemaps/tileMap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('player', 'assets/spriteSheets/player_sprite_bow.png', 48, 48);
    this.load.image('tiles', 'assets/tilesets/tiles.png');
    this.load.image('background_menu', 'assets/menus/background_menu.png');
    this.load.image('background_gameover', 'assets/menus/background_gameover.jpg');
    this.load.image('enemy', 'assets/spriteSheets/beaver.png');
    this.load.spritesheet('button', 'assets/spriteSheets/button_sprite_sheet.png', 193, 71);
    this.load.image('textSurface', 'assets/ui/panel_blue.png');
    this.load.image('textSurfaceInset', 'assets/ui/panelInset_blue.png');
    this.load.audio('message_letter', 'assets/sounds/message_letter.wav');
    this.load.image('arrow', 'assets/spriteSheets/arrow.png');
    this.load.spritesheet('explosion', 'assets/spriteSheets/explosion_sprite_sheet.png', 32, 32);
  },

  create: function() {
    this.state.start('menuState');
  }
};