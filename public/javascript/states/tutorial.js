var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.tutorial = function() {};
LAMDAQuest.tutorial.prototype = {
  create: function() {

    LAMDAQuest.MAP.initMap(this);

    LAMDAQuest.PLAYER.createPlayer(this);

    LAMDAQuest.INPUT.initInput(this);

    this.messageData = LAMDAQuest.data.loadMessages();

    LAMDAQuest.SOUNDS.init(this);
    
    LAMDAQuest.TEXTBOX.createTextBox(this);
    LAMDAQuest.TEXTBOX.hideTextBox();

    //set up rune pool
    this.runePool = this.add.group();
    this.runePool.enableBody = true;
    this.runePool.physicsBodyType = Phaser.Physics.ARCADE;
    this.runePool.createMultiple(10, 'rune');
    this.runePool.setAll('anchor.x', 0.5);
    this.runePool.setAll('anchor.y', 0.5);
    this.runePool.setAll('outOfBoundsKill', true);
    this.runePool.setAll('checkWorldBounds', true);   

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

    //scripting rune count and display
    this.runeCount = 0;
    this.runeLabel = this.game.add.text(50, 100, 'Scripting Runes: 0',
      {font: '18px Arial', fill: '#000000'});


    //health count and display
    this.healthLabel = this.game.add.text(50, 150, 'Health: 100',
      {font: '18px Arial', fill: '#000000'});


    //setTimeout(this.triggerMessage("intro"), 4000);
  },

  update: function() {
    
    if(!LAMDAQuest.globals.paused) {
      LAMDAQuest.PLAYER.updatePlayer(this);
      LAMDAQuest.INPUT.checkInput(this);
      this.game.physics.arcade.collide(this.player, this.environmentLayer);
      //call spawn enemy function
      this.spawnEnemy();
      //if player and enemy overlap, call playerDie function
      this.game.physics.arcade.overlap(this.player, this.enemyPool, this.playerHit, null, this);

      //if and arrow overlaps with an enemy, call enemyHit function
      this.game.physics.arcade.overlap(this.arrowPool, this.enemyPool, this.enemyHit, null, this);

      //if player and rune overlap, take the rune
      this.game.physics.arcade.overlap(this.player, this.runePool, this.takeRune, null, this);

      if(this.player.health == 0)
      {
        this.playerDie();
      }
    } else {
      //Scripting menu updates
    }
  },

  pauseUpdate: function() {
    //this.player.pauseTween.update();
  },

  triggerMessage: function(key) {
    var text = this.getMessage(key);
    if(!LAMDAQuest.data.alreadySeen(key)) {
      LAMDAQuest.TEXTBOX.showMessage(text);
      LAMDAQuest.data.markAsRead(key);
    }
  },

  getMessage: function(key) {
    return this.messageData.tutorial[key];
  },

  playerHit: function(player, enemy){
    this.player.health -= 10;
    this.healthLabel.text = "Health: " + this.player.health;
    enemy.kill();
    enemy.alive = false;
    this.enemyCount -= 1;
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
    var dropchance = this.rnd.integerInRange(1,5)
    if(dropchance == 1)
    {
      var rune = this.runePool.getFirstExists(false)
      {
        rune.reset(enemy.x, enemy.y);
      }
    }
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

    this.arrow_shot.play();
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
      enemy.reset(this.rnd.integerInRange(700, 50), 50);
      this.enemyCount += 1;
      this.enemyMovement(enemy);        
    }
  },

  enemyMovement: function(enemy){

    this.physics.arcade.moveToObject(enemy, this.player, 100);
  },

  takeRune: function(player, rune){
    rune.kill();
    this.runeCount += 1;
    this.runeLabel.text = "Scripting Runes: " + this.runeCount;
  },

  explode: function(sprite) {
    if (this.explosionPool.countDead() === 0) {
      return;
    }
      var explosion = this.explosionPool.getFirstExists(false);
      explosion.reset(sprite.x, sprite.y);
      explosion.play('boom', 15, false, true);
      this.beaver_death.play();
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