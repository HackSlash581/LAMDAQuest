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
          explosionPool,
          spearPool;
          
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
      this.enemyPool.enableBody = true;
      this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
      this.enemyPool.createMultiple(10, 'enemy');
      this.enemyPool.setAll('anchor.x', 0.5);
      this.enemyPool.setAll('anchor.y', 0.5);
      this.enemyPool.setAll('outOfBoundsKill', true);
      this.enemyPool.setAll('checkWorldBounds', true);

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

      //LQ.spearPool = spearPool;
      this.spearPool = this.add.group();
      spearPool = this.spearPool;
      spearPool.enableBody = true;
      spearPool.physicsBodyType = Phaser.Physics.ARCADE;
      spearPool.createMultiple(100, 'spear');
      spearPool.setAll('anchor.x', 0.5);
      spearPool.setAll('anchor.y', 0.5);
      spearPool.setAll('outOfBoundsKill', true);
      spearPool.setAll('checkWorldBounds', true);

      this.arrowPool = this.add.group();
      arrowPool = this.arrowPool;
      arrowPool.enableBody = true;
      arrowPool.physicsBodyType = Phaser.Physics.ARCADE;
      arrowPool.createMultiple(100, 'arrow');
      arrowPool.setAll('anchor.x', 0.5);
      arrowPool.setAll('anchor.y', 0.5);
      arrowPool.setAll('outOfBoundsKill', true);
      arrowPool.setAll('checkWorldBounds', true);
      
      //add spear to game
      this.spear = this.game.add.sprite(500, 300, 'spear');
      this.game.physics.arcade.enable(this.spear);

      //add bow to game
      this.bow = this.game.add.sprite(800, 400, 'bow');
      this.game.physics.arcade.enable(this.bow);      

      this.nextEnemyAt = 0;
      this.enemyDelay = 1000;
      this.enemyCount = 0;
      this.maxEnemy = 3;
      this.enemiesKilled = 0;


      //health count and display  
      LQ.healthLabel = LQ.game.add.text(25, 25, 'Health: 100',
        {font: '18px Arial', fill: '#000000'});
      LQ.healthLabel.fixedToCamera = true;

      //scripting rune count and display
      LQ.runeLabel = LQ.game.add.text(25, 50, 'Scripting Runes: 0',
        {font: '18px Arial', fill: '#000000'});
      LQ.runeLabel.fixedToCamera = true;

      //ammo count and display
      LQ.spearsLabel = LQ.game.add.text(25, 75, 'Spears: 0',
        {font: '18px Arial', fill: '#000000'});
      LQ.spearsLabel.fixedToCamera = true;

      LQ.arrowsLabel = LQ.game.add.text(25, 100, 'Arrows: 0',
        {font: '18px Arial', fill: '#000000'});
      LQ.arrowsLabel.fixedToCamera = true;

      //setTimeout(this.triggerMessage("intro"), 4000);
    },

    update: function() {
      var arcade;
      if(!LQ.globals.paused && !LQ.player.dying) {
        player.updatePlayer();
        input.checkInput();

        arcade = LQ.game.physics.arcade;

        arcade.collide(LQ.player, LQ.environmentLayer);
        arcade.collide(LQ.enemyPool, LQ.environmentLayer);
        arcade.collide(this.enemyPool, this.enemyPool);
    
        //enemies stop spawning after 10 have been killed... they won!
        if(this.enemiesKilled < 10){
          this.spawnEnemy();
       //   this.enemyMovement();          
        }

        //if player and enemy overlap, call playerHit function
        arcade.overlap(LQ.player, this.enemyPool, this.playerHit, null, this);

        //if and spear overlaps with an enemy, call enemyHit function
        arcade.overlap(this.spearPool, this.enemyPool, this.enemyHit, null, this);
        arcade.overlap(this.arrowPool, this.enemyPool, this.enemyHit, null, this);

        //if player and rune overlap, take the rune
        arcade.overlap(LQ.player, this.runePool, this.takeRune, null, this);

        arcade.overlap(LQ.player, this.spear, this.pickupSpear, null, this);
        arcade.overlap(LQ.player, this.bow, this.pickupBow, null, this);

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
      LQ.healthLabel.text = "Health: " + LQ.player.health;
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

    enemyHit: function(item, enemy){  
      var dropchance = this.rnd.integerInRange(1,2)
      if(dropchance == 1)
      {
        var rune = this.runePool.getFirstExists(false)
        {
          rune.reset(enemy.x, enemy.y);
        }
      }
      item.kill();
      this.explode(enemy);
      enemy.kill();  
      enemy.alive = false;
      this.enemyCount -= 1;
      this.enemiesKilled += 1;

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
      LQ.runeLabel.text = "Scripting Runes: " + LQ.player.runeCount;
    },

    pickupSpear: function(player, spear){
      spear.kill();
      LQ.player.hasSpear = true;
      LQ.player.weapon = "spear";
      LQ.player.spears += 20;
      LQ.spearsLabel.text = "Spears: " + LQ.player.spears;
    },

    pickupBow: function(player, bow){
      bow.kill();
      LQ.player.hasBow = true;
      LQ.player.weapon = "bow";
      LQ.player.arrows += 100;
      LQ.arrowsLabel.text = "Arrows: " + LQ.player.arrows;
    },

    explode: function(sprite) {
      if (this.explosionPool.countDead() === 0) {
        return;
      }
        var explosion = this.explosionPool.getFirstExists(false);
        explosion.reset(sprite.x, sprite.y);
        explosion.play('boom', 15, false, true);
        LQ.beaver_death.play();
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
