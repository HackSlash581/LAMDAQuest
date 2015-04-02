define(['phaser'], function(Phaser) {
  var preload = function() {};
  preload.prototype = {
    preload: function() {
      var load = this.game.load;
      
      var loadingLabel = this.game.add.text(this.game.world.centerX, 150, 'Loading ...',
        {font: '30px Courier New', fill: '#ffffff'}
      );
      loadingLabel.anchor.setTo(0.5, 0.5);
      var progressBar = this.game.add.image(this.game.world.centerX, 200, 'progressBar');
      progressBar.anchor.setTo(0.5, 0.5);
      this.game.load.setPreloadSprite(progressBar);

      this.game.load.tilemap('level1', 'assets/tilemaps/tileMap.json', null, Phaser.Tilemap.TILED_JSON);
      
      load.spritesheet('player', 'assets/spriteSheets/player_sprite_total.png', 48, 48);
      load.spritesheet('ally', 'assets/spriteSheets/turtle_spritesheet.png', 50, 34);
      load.spritesheet('button', 'assets/spriteSheets/button_sprite_sheet.png', 193, 71);
      load.spritesheet('explosion', 'assets/spriteSheets/explosion_sprite_sheet.png', 32, 32);
      load.spritesheet('blue_flame', 'assets/spriteSheets/flameball.png', 32, 32, 1);
      load.image('tiles', 'assets/tilesets/tiles.png');
      load.image('Ground 2', 'assets/tilesets/Ground 2.png');
      load.image('background_menu', 'assets/menus/background_menu.png');
      load.image('background_gameover', 'assets/menus/background_gameover.jpg');
      load.image('enemy', 'assets/spriteSheets/beaver.png');
      load.image('textSurface', 'assets/ui/panel_blue.png');
      load.image('textSurfaceInset', 'assets/ui/panelInset_blue.png');
      load.image('spear', 'assets/spriteSheets/spear.png');
      load.image('bow', 'assets/spriteSheets/bow.png');
      load.image('arrow', 'assets/spriteSheets/arrow.png');
      load.image('rune', 'assets/spriteSheets/rune.png');
      load.image('ally_image', 'assets/spriteSheets/turtle.png');
      load.audio('message_letter', 'assets/sounds/message_letter.wav');
      load.audio('arrow_shot', 'assets/sounds/arrow.wav');
      load.audio('beaver_death', 'assets/sounds/beaver_death.wav');
    },

    create: function() {
      this.game.state.start('menuState');
    }
  };

  return preload;
});