define([
  'phaser', 
  'LAMDAQuest', 
  'maps/map',
  'entities/player',
  'entities/ally',
  'entities/boss',
  'input/input',
  '../../assets/data/messages',
  'audio/sounds',
  'messages/textBox'
], function(Phaser, LAMDAQuest, map, player, ally, boss, input, messages, sounds, textBox) {
  var LQ = LAMDAQuest.getLQ();
  
  var tutorial = function() {};
  tutorial.prototype = {
    create: function() {
      var runePool, 
          enemyPool,
          explosionPool,
          spearPool,
          arrowPool;
          
      map.initMap();
      player.createPlayer();
      player.addScriptingCapabilities();
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
      runePool.createMultiple(100, 'rune');
      runePool.setAll('anchor.x', 0.5);
      runePool.setAll('anchor.y', 0.5);
      runePool.setAll('outOfBoundsKill', true);
      runePool.setAll('checkWorldBounds', true);   

      //set up enemy pool
      this.enemyPool = this.add.group();
      this.enemyPool.enableBody = true;
      this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
      this.enemyPool.createMultiple(100, 'enemy');
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

      //set up bullet pool for mages
      this.bulletPool = this.add.group();
      bulletPool = this.bulletPool;
      bulletPool.enableBody = true;
      bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
      bulletPool.createMultiple(500, 'mage_bullet');
      bulletPool.setAll('anchor.x', 0.5);
      bulletPool.setAll('anchor.y', 0.5);
      bulletPool.setAll('outOfBoundsKill', true);
      bulletPool.setAll('checkWorldBounds', true);

     
      //add spear to game
      this.spear = this.game.add.sprite(500, 300, 'spear');
      this.game.physics.arcade.enable(this.spear);

      //add bow to game
      this.bow = this.game.add.sprite(800, 400, 'bow');
      this.game.physics.arcade.enable(this.bow);

      //add boss trigger (blue flame) to game
      this.blueFlame = this.game.add.sprite(2500, 2770, 'blueFlame');
      this.game.physics.arcade.enable(this.blueFlame);

      //add ally image to game
      this.allyImage = this.game.add.sprite(900, 300, 'ally_image');
      this.game.physics.arcade.enable(this.allyImage);      
      this.nextEnemyAt = 0;
      this.enemyDelay = 1000;
      this.enemyCount = 0;
      this.maxEnemy = 3;
      this.enemiesKilled = 0;


      //spawn mages in dungeon

      this.spawnMage(450, 2800);
      this.spawnMage(360, 3090);
      this.spawnMage(1060, 2685);
      this.spawnMage(1475, 3075);
      this.spawnMage(2280, 2800);

     // setTimeout(this.triggerMessage("intro"), 4000);
    },

    update: function() {
      var arcade;
      if(!LQ.globals.paused && !LQ.player.dying) {
        player.updatePlayer();
        player.callScripts();

        input.checkInput();

        arcade = LQ.game.physics.arcade;

        arcade.collide(LQ.player, LQ.environmentLayer);
        arcade.collide(this.enemyPool, LQ.environmentLayer);
        //arcade.collide(LQ.player, LQ.doors, this.enterDungeon1);
        arcade.collide(this.enemyPool, this.enemyPool);
    
        // **** Enemy updates ******
        this.updateEnemies();

        //enemies stop spawning after 10 have been killed... they won!
        if(this.enemiesKilled < 10){
          this.spawnBeaver();      
        }

        // ******** ALLY updates ******
        if(LQ.player.hasAlly == true)
        {
          if(LQ.ally.attacking == true){

          }
          else{
            if(arcade.distanceBetween(LQ.player, LQ.ally) > 50.0)
            {
              ally.moveCloser();
            }
          }
        }

        // ******** boss updates *******
        if(LQ.player.spawnBoss == true){
          boss.updateBoss();
          arcade.collide(LQ.boss, LQ.environmentLayer);
        }

        //find closest enemy distance    
        LQ.player.closestEnemy = player.findClosestEnemy();

        //if player and enemy overlap, call playerHit function
        arcade.overlap(LQ.player, this.enemyPool, this.playerHit, null, this);
        arcade.overlap(LQ.player, LQ.fireballPool, this.playerHit, null, this);
        arcade.overlap(LQ.player, this.bulletPool, this.playerHit, null, this);

        //if and spear overlaps with an enemy, call enemyHit function
        arcade.overlap(LQ.spearPool, this.enemyPool, this.enemyHit, null, this);
        arcade.overlap(LQ.arrowPool, this.enemyPool, this.enemyHit, null, this);

        //if player and rune overlap, take the rune
        arcade.overlap(LQ.player, this.runePool, this.takeRune, null, this);

        arcade.overlap(LQ.player, this.spear, this.pickupSpear, null, this);
        arcade.overlap(LQ.player, this.bow, this.pickupBow, null, this);
        //gain ally
        arcade.overlap(LQ.player, this.allyImage, ally.createAlly, null, this);

        //if player and ally overlap
        arcade.overlap(LQ.player, LQ.ally, ally.atRest, null, this);
        //if ally and enemy overlap
        arcade.overlap(LQ.ally, this.enemyPool, this.allyHitsEnemy, null, this);

        //if player overlaps with blue flame, spawn boss
        arcade.overlap(LQ.player, this.blueFlame, this.spawnBoss, null, this);

        //this.game.physics.arcade.overlap(LQ.player, this.blue_flame, this.finishTutorial, null, this);

        if(LQ.player.health <= 0) {
          this.playerDie();
        }
      } else {
        //Scripting menu updates
        this.pauseEnemy();
         if(LQ.player.hasAlly == true){
          ally.pauseAlly();          
        }       
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
      if(enemy == LQ.boss){
        this.playerDie();
      }
      else{
        LQ.player.health -= 10;
        LQ.healthLabel.text = "Health: " + LQ.player.health;
        enemy.kill();
        enemy.alive = false;
        this.enemyCount -= 1;       
      }

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

    killEnemy: function(enemy){
      var dropchance = this.rnd.integerInRange(1,2)
      if(dropchance == 1)
      {
        var rune = this.runePool.getFirstExists(false)
        {
          rune.reset(enemy.x, enemy.y);
        }
      }
      this.explode(enemy);
      enemy.kill();  
      enemy.alive = false;
      this.enemyCount -= 1;
      this.enemiesKilled += 1;
      LQ.player.xp += 100;
      if(LQ.player.xp >= LQ.player.xpNeeded[LQ.player.level])
        player.levelUp();

      LQ.player.xpToNext = LQ.player.xpNeeded[LQ.player.level] - LQ.player.xp;      
      LQ.nextLevelLabel.text = "XP to Next: " + LQ.player.xpToNext;


    },

    enemyHit: function(item, enemy){  
      item.kill();
      enemy.health -= 100;
      if(LQ.player.spawnBoss == true){
          if(LQ.boss.alive == true){
            LQ.bossLabel.text = "Boss Health: " + LQ.boss.health;
          }
      }    
      if(enemy.health <= 0){
        this.killEnemy(enemy);
        if(LQ.player.spawnBoss == true){
          if(LQ.boss.alive == false){
            LQ.bossLabel.destroy();
          }          
        } 

      }
    },

    allyHitsEnemy: function(ally, enemy){
      this.killEnemy(enemy);
      ally.body.velocity.x = 0;
      ally.body.velocity.y = 0;
      LQ.ally.attacking = false;
    },

    spawnBeaver: function(){
      if(this.nextEnemyAt < this.time.now && this.enemyCount < this.maxEnemy)
      {
        this.nextEnemyAt = this.time.now + this.enemyDelay;
        var xloc = [350,675];
        var yloc = [150,475];
        //enemy.reset(this.rnd.integerInRange(300, 700), 100);

        var beaver = LQ.game.add.sprite(this.rnd.pick(xloc), this.rnd.pick(yloc), 'enemy');
        beaver.alive = true;
       // enemy.reset(this.rnd.pick(xloc), this.rnd.pick(yloc));
        beaver.category = "beaver";
        this.enemyPool.add(beaver);
        this.enemyCount += 1;     
      }
    },

    spawnMage: function(x_loc, y_loc){
       var mage = LQ.game.add.sprite(x_loc, y_loc, 'mage');
       this.enemyPool.add(mage);
       mage.attackDelay = 750;
       mage.nextAttack = 0;
       mage.category = "mage";
       mage.health = 100;
       mage.alive = true;
    },

    pauseEnemy: function(){
      this.enemyPool.forEach(function(enemy){
        enemy.body.velocity.x = 0;
        enemy.body.velocity.y = 0;

      }, this)
    },

    updateEnemies: function(){
      this.enemyPool.forEachAlive(function(enemy){
        if(enemy.category == "beaver"){
          this.physics.arcade.moveToObject(enemy, LQ.player, 60);         
        }
        if(enemy.category == "mage"){
          this.mageAttack(enemy);
        }
      }, this)
      
    },

    mageAttack: function(mage){
          if(mage.nextAttack > LQ.game.time.now){
            return;
          }
          mage.nextAttack = LQ.game.time.now + mage.attackDelay;
          var bullet = this.bulletPool.getFirstExists(false);
          bullet.reset(mage.x + 20, mage.y + 30);
          bullet.body.velocity.x = -300;         
    },

    destroyItem: function(item){
      item.kill();
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

    spawnBoss: function(player, item){
      item.kill();
      boss.createBoss();
      this.enemyPool.add(LQ.boss);
      LQ.player.spawnBoss = true;
    },

    enterDungeon1: function() {
      //this.saveState();
      var blackRect = LQ.game.add.graphics(0, 0);
      blackRect.beginFill(0x000000, 0);
      blackRect.lineStyle(3, 0x000000, 0);
      blackRect.drawRect(LQ.game.world.x, LQ.game.world.y, LQ.game.world.width, LQ.game.world.height);
      blackRect.endFill();
      var fadeoutTween = LQ.game.add.tween(blackRect.alpha).to({alpha: 1}, 2000, Phaser.Easing.Linear.None);
      fadeoutTween.onComplete.add(function() {
         LQ.game.state.start('dungeon1');
      }, LQ);
      
      fadeoutTween.start();
    },

    saveState: function() {

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
