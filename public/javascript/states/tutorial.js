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


    //set up spear group
    this.spearPool = this.add.group();
    this.spearPool.enableBody = true;
    this.spearPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.spearPool.createMultiple(100, 'spear');
    this.spearPool.setAll('anchor.x', 0.5);
    this.spearPool.setAll('anchor.y', 0.5);
    this.spearPool.setAll('outOfBoundsKill', true);
    this.spearPool.setAll('checkWorldBounds', true);


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

    //add spear to game
    this.spear = this.game.add.sprite(500, 300, 'spear');
    this.game.physics.arcade.enable(this.spear);




    this.nextShotAt = 0;
    this.shotDelay = 200;

    this.nextEnemyAt = 0;
    this.enemyDelay = 500;
    this.enemyCount = 0;
    this.maxEnemy = 3;
    this.enemiesKilled = 0;


    //health count and display  
    this.healthLabel = this.game.add.text(25, 25, 'Health: 100',
      {font: '18px Arial', fill: '#000000'});
    this.healthLabel.fixedToCamera = true;

    //scripting rune count and display
    this.runeLabel = this.game.add.text(25, 50, 'Scripting Runes: 0',
      {font: '18px Arial', fill: '#000000'});
    this.runeLabel.fixedToCamera = true;

    //ammo count and display
    this.ammoLabel = this.game.add.text(25, 75, 'Ammo: 0',
      {font: '18px Arial', fill: '#000000'});
    this.ammoLabel.fixedToCamera = true;

    //setTimeout(this.triggerMessage("intro"), 4000);
  },

  update: function() {
    if(!LAMDAQuest.globals.paused && !this.player.dying) {
        LAMDAQuest.PLAYER.updatePlayer(this);
        LAMDAQuest.INPUT.checkInput(this);
        this.game.physics.arcade.collide(this.player, this.environmentLayer);

        //enemies stop spawning after 10 have been killed... they won!
        if(this.enemiesKilled < 10){
          this.spawnEnemy();
          this.enemyMovement();          
        }

        //if player and enemy overlap, call playerHit function
        this.game.physics.arcade.overlap(this.player, this.enemyPool, this.playerHit, null, this);

        //if and spear overlaps with an enemy, call enemyHit function
        this.game.physics.arcade.overlap(this.spearPool, this.enemyPool, this.enemyHit, null, this);

        //if player and rune overlap, take the rune
        this.game.physics.arcade.overlap(this.player, this.runePool, this.takeRune, null, this);

        this.game.physics.arcade.overlap(this.player, this.spear, this.pickupSpear, null, this);

        if(this.player.health <= 0)
        {
          this.playerDie();
        }
      } else {
        //Scripting menu updates
        this.pauseEnemy();
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
    this.player.dying = true;
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    this.player.events.onAnimationComplete.add(function(){
      this.player.dying = false;
      this.game.state.start('gameOver');
      }, this);
    
  },

  enemyHit: function(spear, enemy){  
    var dropchance = this.rnd.integerInRange(1,2)
    if(dropchance == 1)
    {
      var rune = this.runePool.getFirstExists(false)
      {
        rune.reset(enemy.x, enemy.y);
      }
    }
    spear.kill();
    this.explode(enemy);
    enemy.kill();  
    enemy.alive = false;
    this.enemyCount -= 1;
    this.enemiesKilled += 1;

  },

  throwSpear: function(){
    //check if able to shoot again yet
    if(this.nextShotAt > this.time.now || this.player.ammo <= 1){
      return;
    }
    this.arrow_shot.play();
    this.nextShotAt = this.time.now + this.shotDelay;

    var spear = this.spearPool.getFirstExists(false);
    spear.reset(this.player.x+25, this.player.y+25);
    spear.rotation = this.physics.arcade.angleToPointer(spear);

    this.player.ammo -= 1;
    this.ammoLabel.text = "Ammo: " + this.player.ammo;

    this.physics.arcade.moveToPointer(spear, 300);      
  },

  spawnEnemy: function(){
    if(this.nextEnemyAt < this.time.now && this.enemyCount < this.maxEnemy)
    {
      this.nextEnemyAt = this.time.now + this.enemyDelay;
      var enemy = this.enemyPool.getFirstExists(false);
      enemy.reset(this.rnd.integerInRange(700, 50), 50);
      this.enemyCount += 1;     
    }
  },

  pauseEnemy: function(){
    this.enemyPool.forEach(function(enemy){
      enemy.body.velocity.x = 0;
      enemy.body.velocity.y = 0;

    }, this)
  },

  enemyMovement: function(){
    this.enemyPool.forEach(function(enemy){
      this.physics.arcade.moveToObject(enemy, this.player, 50);
    }, this)
    
  },

  takeRune: function(player, rune){
    rune.kill();
    this.player.runeCount += 1;
    this.runeLabel.text = "Scripting Runes: " + this.player.runeCount;
  },

  pickupSpear: function(player, spear){
    spear.kill();
    this.player.weapon = "spear";
    this.player.ammo += 20;
    this.ammoLabel.text = "Ammo: " + this.player.ammo;
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