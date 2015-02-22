var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.mainGame = function() {};
LAMDAQuest.mainGame.prototype = {
  create: function() {
    //Initialize the map
    LAMDAQuest.MAP.initMap(this);

    //Initialize player on the map
    LAMDAQuest.PLAYER.createPlayer(this);

    //Initialize UI
    LAMDAQuest.UI.createMyButton(this);
    
    //Initialize input
    LAMDAQuest.INPUT.initInput(this);


    //set up enemy pool
    this.enemyPool = this.add.group();
    this.enemyPool.enableBody = true;
    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyPool.createMultiple(10, 'enemy');
    this.enemyPool.setAll('anchor.x', 0.5);
    this.enemyPool.setAll('anchor.y', 0.5);
    this.enemyPool.setAll('outOfBoundsKill', true);
    this.enemyPool.setAll('checkWorldBounds', true);


    //set up arrow group
    this.arrowPool = this.add.group();
    this.arrowPool.enableBody = true;
    this.arrowPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.arrowPool.createMultiple(100, 'arrow');
    this.arrowPool.setAll('anchor.x', 0.5);
    this.arrowPool.setAll('anchor.y', 0.5);
    this.arrowPool.setAll('outOfBoundsKill', true);
    this.arrowPool.setAll('checkWorldBounds', true);


    //set up explosion group
    this.explosionPool = this.add.group();
    this.explosionPool.enableBody = true;
    this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosionPool.createMultiple(100, 'explosion');
    this.explosionPool.setAll('anchor.x', 0.5);
    this.explosionPool.setAll('anchor.y', 0.5);
    this.explosionPool.forEach(function (explosion) {
      explosion.animations.add('boom');
    });



    this.nextShotAt = 0;
    this.shotDelay = 200;

    this.nextEnemyAt = 0;
    this.enemyDelay = 500;
    this.enemyCount = 0;
    this.maxEnemy = 10;

    

  },

  update: function() {
    if(!LAMDAQuest.globals.paused) {
      
      LAMDAQuest.PLAYER.updatePlayer(this);
  
      //Check player input
      LAMDAQuest.INPUT.checkInput(this);

      //call spawn enemy function
      this.spawnEnemy();
  
      this.game.physics.arcade.collide(this.player, this.environmentLayer);

      //if player and enemy overlap, call playerDie function
      this.game.physics.arcade.overlap(this.player, this.enemyPool, this.playerDie, null, this);

      //if and arrow overlaps with an enemy, call enemyHit function
      this.game.physics.arcade.overlap(this.arrowPool, this.enemyPool, this.enemyHit, null, this);

    } else {
      //Scripting menu updates
    }
  },

  pauseUpdate: function() {
    //this.player.pauseTween.update();
  },

  playerDie: function(){
    this.player.animations.play('die');
    this.player.animating = true;
    this.player.events.onAnimationComplete.add(function(){
      this.player.animating = false;
      this.game.state.start('gameOver');
      }, this);
    
  },

  enemyHit: function(arrow, enemy){  
    arrow.kill();
    this.explode(enemy);
    enemy.kill();  
    enemy.alive = false;
    this.enemyCount -= 1;

  },

  fireArrow: function(){
    //check if able to shoot again yet
    if(this.nextShotAt > this.time.now){
      return;
    }

    this.nextShotAt = this.time.now + this.shotDelay;

    var arrow = this.arrowPool.getFirstExists(false);
    arrow.reset(this.player.x+25, this.player.y+25);
    arrow.rotation = this.physics.arcade.angleToPointer(arrow);

    this.physics.arcade.moveToPointer(arrow, 300);
  },

  spawnEnemy: function(){
    if(this.nextEnemyAt < this.time.now && this.enemyCount < this.maxEnemy)
    {
      this.nextEnemyAt = this.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      enemy.reset(this.rnd.integerInRange(700, 50), 200);
      this.enemyCount += 1;        
    }
 
  },

  explode: function(sprite) {
    if (this.explosionPool.countDead() === 0) {
      return;
    }
      var explosion = this.explosionPool.getFirstExists(false);
      explosion.reset(sprite.x, sprite.y);
      explosion.play('boom', 15, false, true);
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
  }
};