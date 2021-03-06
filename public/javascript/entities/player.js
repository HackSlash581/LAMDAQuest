define([
  'LAMDAQuest', 
  'maps/map',
  'util/util',
  'entities/scriptable'
], function(LAMDAQuest, map, util, scriptable) {
    var LQ = LAMDAQuest.getLQ();
    var player = (function() {
    var nextShotAt = 0;
    var shotDelay = 200;

    return {
      createPlayer: function() {
        var result = map.findObjectsByType('playerStart', LQ.map, 'GameEntities');
//        LQ.player = LQ.game.add.sprite(result[0].x, result[0].y, 'player');
        LQ.player = LQ.game.add.sprite(58, 2642, 'player');
        LQ.player.displayName = "Steve";
        LQ.player.speed = 75;

        LQ.game.physics.arcade.enable(LQ.player);
        LQ.player.body.collideWorldBounds = true;
        LQ.game.camera.follow(LQ.player);

        //adjust player bounding box
        LQ.player.body.setSize(24, 36, 12, 10);

        this.addPlayerAnimations();
        
        //player info labels
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

        LQ.levelLabel = LQ.game.add.text(700, 25, 'Level: 1',
          {font: '18px Arial', fill: '#000000'});
        LQ.levelLabel.fixedToCamera = true;

        LQ.nextLevelLabel = LQ.game.add.text(650, 50, 'XP to Next: 100',
          {font: '18px Arial', fill: '#000000'});
        LQ.nextLevelLabel.fixedToCamera = true;


        LQ.spearPool = LQ.game.add.group();
        spearPool = LQ.spearPool;
        spearPool.enableBody = true;
        spearPool.physicsBodyType = Phaser.Physics.ARCADE;
        spearPool.createMultiple(100, 'spear');
        spearPool.setAll('anchor.x', 0.5);
        spearPool.setAll('anchor.y', 0.5);
        spearPool.setAll('outOfBoundsKill', true);
        spearPool.setAll('checkWorldBounds', true);

        LQ.arrowPool = LQ.game.add.group();
        arrowPool = LQ.arrowPool;
        arrowPool.enableBody = true;
        arrowPool.physicsBodyType = Phaser.Physics.ARCADE;
        arrowPool.createMultiple(100, 'arrow');
        arrowPool.setAll('anchor.x', 0.5);
        arrowPool.setAll('anchor.y', 0.5);
        arrowPool.setAll('outOfBoundsKill', true);
        arrowPool.setAll('checkWorldBounds', true);


        //default facing direction is down
        LQ.player.facing = "down";
        LQ.player.animating = false;
        LQ.player.health = 100;
        LQ.player.dying = false;
        LQ.player.weapon = "unarmed";
        LQ.player.hasBow = false;
        LQ.player.hasSpear = false;
        LQ.player.runeCount = 0;
        LQ.player.arrows = 0;
        LQ.player.spears = 0;
        LQ.player.hasAlly = false;
        LQ.player.closestEnemy = 100000;
        LQ.player.level = 1;
        LQ.player.xp = 0;
        LQ.player.xpToNext = 100;
        LQ.player.xpNeeded = [0, 100, 500, 1000, 2000, 3500, 5000, 10000];
        LQ.player.spawnBoss = false;
      },

      addScriptingCapabilities: function() {
        util.extend(LQ.player, scriptable);
        LQ.player.scriptableProperties.push('x');
        LQ.player.scriptableProperties.push('y');
        LQ.player.scriptableProperties.push('displayName');
        LQ.player.scriptableProperties.push('speed');
      },

      addPlayerAnimations: function() {
        var animations = LQ.player.animations;
        animations.add('right_unarmed', [13,14,15,16,17,18,19,20,21], 8, true);
        animations.add('left_unarmed', [26,27,28,29,30,31,32,33,34], 8, true);
        animations.add('up_unarmed', [39,40,41,42,43,44,45,46,47], 8, true);
        animations.add('down_unarmed', [0,1,2,3,4,5,6,7,8], 8, true);

        //walking with spear
        animations.add('right_spear', [143,144,145,146,147,148,149,150,151], 8, true);
        animations.add('left_spear', [117,118,119,120,121,122,123,124,125], 8, true);
        animations.add('up_spear', [104,105,106,107,108,109,110,111,112], 8, true);
        animations.add('down_spear', [130,131,132,133,134,135,136,137,138], 8, true);

         //walking with bow
        animations.add('right_bow', [195,196,197,198,199,200,201,202,203], 8, true);
        animations.add('left_bow', [169,170,171,172,173,174,175,176,177], 8, true);
        animations.add('up_bow', [156,157,158,159,160,161,162,163,164], 8, true);
        animations.add('down_bow', [182,183,184,185,186,187,188,189,190], 8, true);


        animations.add('stab_right', [91,92,93,94,95,96,97,98], 12, false);
        animations.add('stab_left', [65,66,67,68,69,70,71,72], 12, false);
        animations.add('stab_up', [52,53,54,55,56,57,58,59], 12, false);
        animations.add('stab_down', [78,79,80,81,82,83,84,85], 12, false);

        animations.add('shoot_right', [247,248,249,250,251,252,253,254,255,256,257,258,259], 25, false);
        animations.add('shoot_left', [221,222,223,224,225,226,227,228,229,230,231,232,233], 25, false);
        animations.add('shoot_up', [208,209,210,211,212,213,214,215,216,217,218,219,220], 25, false);
        animations.add('shoot_down', [234,235,236,237,238,239,240,241,242,243,244,245,246], 25, false);
     
        animations.add('die', [260,261,262,263,264,265], 4, false);
      },

      callScripts: function() {
        if(LQ.player.ifScript) {
          LQ.player.ifScript();
        }
        if(LQ.player.intervalScript) {
          LQ.player.intervalScript();
        }
      },

      updatePlayer: function() {
        LQ.player.body.velocity.y = 0;
        LQ.player.body.velocity.x = 0;
      },

      throwSpear: function(){
        //check if able to shoot again yet
        if(nextShotAt > LQ.game.time.now || LQ.player.spears <= 1){
          return;
        }
        LQ.arrow_shot.play();
        nextShotAt = LQ.game.time.now + shotDelay;
        var spear = spearPool.getFirstExists(false);
        spear.reset(LQ.player.x+25, LQ.player.y+25);
        spear.rotation = LQ.game.physics.arcade.angleToPointer(spear);
        LQ.player.spears -= 1;
        LQ.spearsLabel.text = "Spears: " + LQ.player.spears;
        LQ.game.physics.arcade.moveToPointer(spear, 300);      
      },

      shootBow: function(){
        //check if able to shoot again yet
        if(nextShotAt > LQ.game.time.now || LQ.player.arrows < 1){
          return;
        }
        LQ.arrow_shot.play();
        nextShotAt = LQ.game.time.now + shotDelay;
        var arrow = arrowPool.getFirstExists(false);
        arrow.reset(LQ.player.x+25, LQ.player.y+25);
        arrow.rotation = LQ.game.physics.arcade.angleToPointer(arrow);
        LQ.player.arrows -= 1;
        LQ.arrowsLabel.text = "Arrows: " + LQ.player.arrows;
        LQ.game.physics.arcade.moveToPointer(arrow, 300);      
      },

      attack: function(){
        if(LQ.player.weapon == "bow"){
          if(LQ.player.facing == "right")
            LQ.player.animations.play('shoot_right');
          else if(LQ.player.facing == "left")
            LQ.player.animations.play('shoot_left');
          else if(LQ.player.facing == "up")
            LQ.player.animations.play('shoot_up');
          else if(LQ.player.facing == "down")
            LQ.player.animations.play('shoot_down');
          player.shootBow();
        }
        else if(LQ.player.weapon == "spear"){
          if(LQ.player.facing == "right")
            LQ.player.animations.play('stab_right');
          else if(LQ.player.facing == "left")
            LQ.player.animations.play('stab_left');
          else if(LQ.player.facing == "up")
            LQ.player.animations.play('stab_up');
          else if(LQ.player.facing == "down")
            LQ.player.animations.play('stab_down');
          player.throwSpear();        
        }
      },

      findClosestEnemy: function(){
        var enemyPool = LQ.game.state.states.tutorial.enemyPool;
        var closestDistance = 100000;
        enemyPool.forEachAlive(function(enemy){
          distance = LQ.game.physics.arcade.distanceBetween(enemy, LQ.player);
          if(distance < closestDistance)
          {
            closestDistance = distance;
          }
        }, this)
        return closestDistance;
      },

      levelUp: function(){
        LQ.player.level += 1;
        LQ.levelLabel.text = "Level: " + LQ.player.level;
      },
    };
  }());

  return player;
});
