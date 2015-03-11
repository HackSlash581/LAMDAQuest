define(['LAMDAQuest'], function(LAMDAQuest) {
  var LQ = LAMDAQuest.getLQ();
  var sounds = (function() {
    return {
      init: function() {
        LQ.message_letter = LQ.game.add.audio('message_letter');
        LQ.arrow_shot = LQ.game.add.audio('arrow_shot');
        LQ.beaver_death = LQ.game.add.audio('beaver_death');
      },
    };
  }());

  return sounds;
})
