var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.SOUNDS = (function() {

  return {
    init: function(mainGame) {
      mainGame.message_letter = mainGame.game.add.audio('message_letter');
      mainGame.arrow_shot = mainGame.game.add.audio('arrow_shot');
      mainGame.beaver_death = mainGame.game.add.audio('beaver_death');
    },
  };
})();