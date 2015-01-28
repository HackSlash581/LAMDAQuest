var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.mainGame = function() {};
LAMDAQuest.mainGame.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');

    this.map.addTilesetImage('tiles', 'sygma_dwtileset2');

    this.backgroundlayer = this.map.createLayer('BackgroundLayer');

    this.environmentLayer = this.map.createLayer('EnvironmentLayer');

    this.myButton = this.game.add.button(200, 400, 'button', actionOnClick, this, 2, 1, 0);

    function actionOnClick() {};
    function over() {};
    function up() {};
    function out() {};
    
    this.myButton.onInputOver.add(over, this);
    this.myButton.onInputOut.add(out, this);
    this.myButton.onInputUp.add(up, this);

    this.map.setCollisionBetween(1205, 1755, true, 'EnvironmentLayer');
    this.backgroundlayer.resizeWorld();

    var result = this.findObjectsByType('playerStart', this.map, 'GameEntities');
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.game.physics.arcade.enable(this.player);
    this.game.camera.follow(this.player);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },

  findObjectsByType: function(type, map, layer) {
    var result = [];
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },

  update: function() {
    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      this.player.body.velocity.y -= 50;
    }
    else if(this.cursors.down.isDown) {
      this.player.body.velocity.y += 50;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 50;
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 50;
    }

    this.game.physics.arcade.collide(this.player, this.environmentLayer);
    
  }
};