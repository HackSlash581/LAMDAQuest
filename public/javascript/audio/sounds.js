var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.SOUNDS = (function() {

  return {
    init: function(mainGame) {
      mainGame.message_letter = mainGame.game.add.audio('message_letter');
    },

  };
})();