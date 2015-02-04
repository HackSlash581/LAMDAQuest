var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.mainGame = function() {};
LAMDAQuest.mainGame.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');

    this.map.addTilesetImage('tiles', 'sygma_dwtileset2');

    this.backgroundlayer = this.map.createLayer('BackgroundLayer');

    this.environmentLayer = this.map.createLayer('EnvironmentLayer');
    this.map.setCollisionBetween(1205, 1755, true, 'EnvironmentLayer');
    this.backgroundlayer.resizeWorld();

    var result = this.findObjectsByType('playerStart', this.map, 'GameEntities');
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.game.physics.arcade.enable(this.player);
    this.game.camera.follow(this.player);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    //add beaver enemy to game
    this.enemy = this.game.add.sprite(60, 5, 'enemy');
    this.game.physics.arcade.enable(this.enemy);

    //adding player animations
    this.player.animations.add('right', [5,6,7,8,9], 8, true);
    this.player.animations.add('left', [0,1,2,3,4], 8, true);
    this.player.animations.add('up', [10,11,12,13,14], 8, true);
    this.player.animations.add('down', [15,16,17,18,19], 8, true);

    //default facing direction is down
    this.player.facing = "down";
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
    //player movement function
    this.movePlayer();

    this.game.physics.arcade.collide(this.player, this.environmentLayer);

    //if player and enemy overlap, call playerDie function
    this.game.physics.arcade.overlap(this.player, this.enemy, this.playerDie,
                                    null, this);
    
  },

  playerDie: function(){
    this.game.state.start('gameOver');
  },

  movePlayer: function(){
      //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      this.player.body.velocity.y -= 50;
      this.player.animations.play('up');
      this.player.facing = "up";
    }
    else if(this.cursors.down.isDown) {
      this.player.body.velocity.y += 50;
      this.player.animations.play('down');
      this.player.facing = "down";
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 50;
      this.player.animations.play('left');
      this.player.facing = "left";
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 50;
      this.player.animations.play('right');
      this.player.facing = "right";
    }

    //will need better logic here when adding attacks and other animations
    if(!this.cursors.right.isDown && !this.cursors.left.isDown &&
      !this.cursors.up.isDown && !this.cursors.down.isDown)
    {
      this.player.animations.stop();
      if(this.player.facing == "up")
        this.player.frame = 10;
      if(this.player.facing == "down")
        this.player.frame = 15;
      if(this.player.facing == "left")
        this.player.frame = 0;
      if(this.player.facing == "right")
        this.player.frame = 5;
    }
  },


};
