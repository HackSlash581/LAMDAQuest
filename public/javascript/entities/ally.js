define([
  'LAMDAQuest', 
  'maps/map',
  'util/util',
  'entities/scriptable'
], function(LAMDAQuest, map) {
  var LQ = LAMDAQuest.getLQ();
  var ally = (function() {

    var nextAttackAt = 0;
    var attackDelay = 1000;  


    return {
      createAlly: function(player, allyImage) {
        allyImage.kill();
        LQ.ally = LQ.game.add.sprite(LQ.player.x + 50, LQ.player.y + 10, 'ally_image');
        LQ.game.physics.arcade.enable(LQ.ally);
        LQ.ally.body.collideWorldBounds = true;

        ally.addAllyAnimations();

        LQ.ally.facing = "down";
        LQ.ally.attacking = false;
        LQ.player.hasAlly = true;
        LQ.ally.displayName = "Shelly";
        LQ.ally.speed = 75
        LQ.ally.attackSpeed = 300;
      },

      addScriptingCapabilities: function() {
        util.extend(LQ.ally, scriptable);
        LQ.ally.scriptableProperties.push('displayName');
        LQ.ally.scriptableProperties.push('speed');
      },

      addAllyAnimations: function(){

      },

      moveCloser: function(){
        var speed = LQ.ally.speed;
        LQ.game.physics.arcade.moveToObject(LQ.ally, LQ.player, speed);
      },

      attack: function(){
        enemyCount = LQ.game.state.states.tutorial.enemyCount;
        enemyPool = LQ.game.state.states.tutorial.enemyPool;
        if(nextAttackAt > LQ.game.time.now || enemyCount == 0){
          return;
        }
        nextAttackAt = LQ.game.time.now + attackDelay;

        var closestDistance = 100000;
        var index;

        enemyPool.forEachAlive(function(enemy){
          distance = LQ.game.physics.arcade.distanceBetween(enemy, LQ.player);
          if(distance < closestDistance)
          {
            index = enemyPool.getIndex(enemy);
            closestDistance = distance;
          }
        }, this)

        var attackSpeed = LQ.ally.attackSpeed;

        LQ.game.physics.arcade.moveToObject(LQ.ally, enemyPool.getChildAt(index), attackSpeed);
        LQ.ally.attacking = true;
      },

      atRest: function(){
        if(!LQ.ally.attacking){
          LQ.ally.body.velocity.x = 0;
          LQ.ally.body.velocity.y = 0;          
        }
      },

      pauseAlly: function(){
        LQ.ally.body.velocity.x = 0;
        LQ.ally.body.velocity.y = 0;          
      },

    };
  }());

  return ally;
});