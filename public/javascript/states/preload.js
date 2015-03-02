var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.preload = function() {

};

LAMDAQuest.preload.prototype = {
  preload: function() {
    var loadingLabel = this.game.add.text(this.game.world.centerX, 150, 'Loading ...',
      {font: '30px Courier New', fill: '#ffffff'}
    );
    loadingLabel.anchor.setTo(0.5, 0.5);
    var progressBar = this.game.add.sprite(this.game.world.centerX, 200, 'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(progressBar);

    this.load.tilemap('level1', 'assets/tilemaps/tileMap.json', null, Phaser.Tilemap.TILED_JSON);
    
    this.load.spritesheet('player', 'assets/spriteSheets/player_sprite_bow.png', 48, 48);
    this.load.spritesheet('button', 'assets/spriteSheets/button_sprite_sheet.png', 193, 71);
    this.load.spritesheet('explosion', 'assets/spriteSheets/explosion_sprite_sheet.png', 32, 32);

    this.load.image('tiles', 'assets/tilesets/tiles.png');
    this.load.image('background_menu', 'assets/menus/background_menu.png');
    this.load.image('background_gameover', 'assets/menus/background_gameover.jpg');
    this.load.image('enemy', 'assets/spriteSheets/beaver.png');
    this.load.image('textSurface', 'assets/ui/panel_blue.png');
    this.load.image('textSurfaceInset', 'assets/ui/panelInset_blue.png');
    this.load.image('arrow', 'assets/spriteSheets/arrow.png');
    this.load.image('rune', 'assets/spriteSheets/rune.png');

    this.load.audio('message_letter', 'assets/sounds/message_letter.wav');
    this.load.audio('arrow_shot', 'assets/sounds/arrow.wav');
    this.load.audio('beaver_death', 'assets/sounds/beaver_death.wav');
  },

  create: function() {
    this.state.start('menuState');
  }
};