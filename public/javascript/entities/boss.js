define([
  'LAMDAQuest', 
  'maps/map',
  'util/util',
  'entities/scriptable'
], function(LAMDAQuest, map) {
  var LQ = LAMDAQuest.getLQ();
  var boss = (function() {
    var nextAttack = 0;
    var attackDelay = 750;
    var nextRandom = 0;
    var randomDelay = 100;

  	return {
  		createBoss: function() {
  			LQ.boss = LQ.game.add.sprite(2900, 2775, 'boss_image');
  			LQ.game.physics.arcade.enable(LQ.boss);
  			LQ.boss.body.collideWorldBounds = true;
        LQ.boss.body.velocity.y = 75 * Phaser.Math.randomSign();
        LQ.boss.body.bounce.y = 1.0;

  			LQ.boss.health = 1000;
        LQ.boss.alive = true;

      	LQ.bossLabel = LQ.game.add.text(325, 550, "Boss Health: 1000",
      			{font: '18px Arial', fill: '#000000'});
      	LQ.bossLabel.fixedToCamera = true;

      	LQ.fireballPool = LQ.game.add.group();
      	fireballPool = LQ.fireballPool;
		    fireballPool.enableBody = true;
		    fireballPool.physicsBodyType = Phaser.Physics.ARCADE;
		    fireballPool.createMultiple(100, 'fireball');
		    fireballPool.setAll('anchor.x', 0.5);
		    fireballPool.setAll('anchor.y', 0.5);
		    fireballPool.setAll('outOfBoundsKill', true);
		    fireballPool.setAll('checkWorldBounds', true);

  		},

      updateBoss: function(){
        if(LQ.boss.health <= 0){
          boss.die();
        }
        if(LQ.boss.alive == true){
          boss.attackToPlayer(); 
          boss.attackRandom();  
        }
      },

      attackRandom: function(){
        if(nextRandom > LQ.game.time.now){
          return;
        }
        nextRandom = LQ.game.time.now + randomDelay;
        var fireball = fireballPool.getFirstExists(false);
        fireball.reset(LQ.boss.x + 20, LQ.boss.y + 30);
        var direction_x = LQ.game.rnd.frac();;
        var direction_y = 1.0 - direction_x;
        var quad = LQ.game.rnd.between(1,4);
        if(quad == 1){
          fireball.body.velocity.x = direction_x * 300;
          fireball.body.velocity.y = direction_y * -300; 
        }
        else if(quad == 2){
          fireball.body.velocity.x = direction_x * -300;
          fireball.body.velocity.y = direction_y * -300; 
        }
        else if(quad == 3){
          fireball.body.velocity.x = direction_x * -300;
          fireball.body.velocity.y = direction_y * 300; 
        }
        else if(quad == 4){
          fireball.body.velocity.x = direction_x * 300;
          fireball.body.velocity.y = direction_y * 300;     
        }


      },

      attackToPlayer: function(){
        if(nextAttack > LQ.game.time.now){
          return;
        }
        nextAttack = LQ.game.time.now + attackDelay;
        var fireball = fireballPool.getFirstExists(false);
        fireball.reset(LQ.boss.x + 20, LQ.boss.y + 30);
        LQ.game.physics.arcade.moveToObject(fireball, LQ.player, 300);
      },

      die: function(){
        LQ.boss.alive = false;
      },


    };
  }());

  return boss;
});