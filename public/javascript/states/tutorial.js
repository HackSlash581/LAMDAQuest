define(['phaser', 
  'LAMDAQuest', 
  'maps/map',
  'entities/player',
  'input/input',
  '../../assets/data/messages',
  'audio/sounds',
  'messages/textBox'
], function(Phaser, LAMDAQuest, map, player, input, messages, sounds, textBox) {
  var LQ = LAMDAQuest.getLQ();

  var tutorial = function() {};
  tutorial.prototype = {
    create: function() {
      var runePool,
          enemyPool,
          spearPool,
          explosionPool;

      map.initMap();
      player.createPlayer();
      input.initInput();
      sounds.init();

      LQ.messageData = messages.loadMessages();
      
      textBox.createTextBox();
      textBox.hideTextBox();

      //set up rune pool
      this.runePool = this.add.group();
      runePool = this.runePool;
      runePool.enableBody = true;
      runePool.physicsBodyType = Phaser.Physics.ARCADE;
      runePool.createMultiple(10, 'rune');
      runePool.setAll('anchor.x', 0.5);
      runePool.setAll('anchor.y', 0.5);
      runePool.setAll('outOfBoundsKill', true);
      runePool.setAll('checkWorldBounds', true);   

      //set up enemy pool
      this.enemyPool = this.add.group();
      enemyPool = this.enemyPool;
      enemyPool.enableBody = true;
      enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
      enemyPool.createMultiple(10, 'enemy');
      enemyPool.setAll('anchor.x', 0.5);
      enemyPool.setAll('anchor.y', 0.5);
      enemyPool.setAll('outOfBoundsKill', true);
      enemyPool.setAll('checkWorldBounds', true);


      //set up spear group
      this.spearPool = this.add.group();
      spearPool = this.spearPool;
      spearPool.enableBody = true;
      spearPool.physicsBodyType = Phaser.Physics.ARCADE;
      spearPool.createMultiple(100, 'spear');
      spearPool.setAll('anchor.x', 0.5);
      spearPool.setAll('anchor.y', 0.5);
      spearPool.setAll('outOfBoundsKill', true);
      spearPool.setAll('checkWorldBounds', true);


      //set up explosion group
      this.explosionPool = this.add.group();
      explosionPool = this.explosionPool;
      explosionPool.enableBody = true;
      explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
      explosionPool.createMultiple(100, 'explosion');
      explosionPool.setAll('anchor.x', 0.5);
      explosionPool.setAll('anchor.y', 0.5);
      explosionPool.forEach(function (explosion) {
        explosion.animations.add('boom');
      });

      //add spear to game
      this.spear = this.game.add.sprite(500, 300, 'spear');
      this.game.physics.arcade.enable(this.spear);

      this.nextShotAt = 0;
      this.shotDelay = 200;

      this.nextEnemyAt = 0;
      this.enemyDelay = 1000;
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
      var arcade;
      if(!LQ.globals.paused && !LQ.player.dying) {
        player.updatePlayer();
        input.checkInput();

        arcade = this.game.physics.arcade;
        arcade.collide(LQ.player, this.environmentLayer);
        arcade.collide(this.enemyPool, this.environmentLayer);
        arcade.collide(this.enemyPool, this.enemyPool);
    
        //enemies stop spawning after 10 have been killed... they won!
        if(this.enemiesKilled < 10){
          this.spawnEnemy();
          this.enemyMovement();          
        }

        //if player and enemy overlap, call playerHit function
        arcade.overlap(LQ.player, this.enemyPool, this.playerHit, null, this);

        //if and spear overlaps with an enemy, call enemyHit function
        arcade.overlap(this.spearPool, this.enemyPool, this.enemyHit, null, this);

        //if player and rune overlap, take the rune
        arcade.overlap(LQ.player, this.runePool, this.takeRune, null, this);

        arcade.overlap(LQ.player, this.spear, this.pickupSpear, null, this);

        //this.game.physics.arcade.overlap(LQ.player, this.blue_flame, this.finishTutorial, null, this);

        if(LQ.player.health <= 0) {
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
      if(!LQ.data.alreadySeen(key)) {
        LQ.TEXTBOX.showMessage(text);
        LQ.data.markAsRead(key);
      }
    },

    getMessage: function(key) {
      return LQ.messageData.tutorial[key];
    },

    playerHit: function(player, enemy){
      LQ.player.health -= 10;
      this.healthLabel.text = "Health: " + LQ.player.health;
      enemy.kill();
      enemy.alive = false;
      this.enemyCount -= 1;
    },

    playerDie: function(){
      var player = LQ.player;
      player.animations.play('die');
      player.dying = true;
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;
      player.events.onAnimationComplete.add(function(){
        player.dying = false;
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
      if(this.nextShotAt > this.time.now || LQ.player.ammo <= 1){
        return;
      }
      this.arrow_shot.play();
      this.nextShotAt = this.time.now + this.shotDelay;

      var spear = this.spearPool.getFirstExists(false);
      spear.reset(LQ.player.x+25, LQ.player.y+25);
      spear.rotation = this.physics.arcade.angleToPointer(spear);

      LQ.player.ammo -= 1;
      this.ammoLabel.text = "Ammo: " + LQ.player.ammo;

      this.physics.arcade.moveToPointer(spear, 300);      
    },

    spawnEnemy: function(){
      if(this.nextEnemyAt < this.time.now && this.enemyCount < this.maxEnemy)
      {
        this.nextEnemyAt = this.time.now + this.enemyDelay;
        var enemy = this.enemyPool.getFirstExists(false);
        var xloc = [350,675];
        var yloc = [150,475];
        //enemy.reset(this.rnd.integerInRange(300, 700), 100);
        enemy.reset(this.rnd.pick(xloc), this.rnd.pick(yloc));
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
        this.physics.arcade.moveToObject(enemy, LQ.player, 60);
      }, this)
      
    },

    takeRune: function(player, rune){
      rune.kill();
      LQ.player.runeCount += 1;
      this.runeLabel.text = "Scripting Runes: " + LQ.player.runeCount;
    },

    pickupSpear: function(player, spear){
      spear.kill();
      LQ.player.weapon = "spear";
      LQ.player.ammo += 20;
      this.ammoLabel.text = "Ammo: " + LQ.player.ammo;
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

    finishTutorial: function() {
      this.triggerMessage("win");
      setTimeout(function() {
        this.state.start("menuState");
      }, 4000);
    }
  };

  return tutorial;
});
