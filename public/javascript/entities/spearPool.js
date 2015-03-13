define(['phaser', 'LAMDAQuest'], function(Phaser, LAMDAQuest) {
  var LQ = LAMDAQuest.getLQ();
  var spearPool = createSpearPool();
    
  function createSpearPool() {
    var pool = LQ.game.add.group();
    pool.enableBody = true;
    pool.physicsBodyType = Phaser.Physics.ARCADE;
    pool.createMultiple(100, 'spear');
    pool.setAll('anchor.x', 0.5);
    pool.setAll('anchor.y', 0.5);
    pool.setAll('outOfBoundsKill', true);
    pool.setAll('checkWorldBounds', true);
    return pool;
  }

  return spearPool;
});