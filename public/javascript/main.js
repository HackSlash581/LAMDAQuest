var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.globals = {
  "width": 800,
  "height": 600,
  "paused": false
};

LAMDAQuest.game = new Phaser.Game(LAMDAQuest.globals.width, LAMDAQuest.globals.height, Phaser.AUTO, 'gameDiv');

LAMDAQuest.game.state.add('boot', LAMDAQuest.boot);
LAMDAQuest.game.state.add('preload', LAMDAQuest.preload);
LAMDAQuest.game.state.add('menuState', LAMDAQuest.menuState);
LAMDAQuest.game.state.add('mainGame', LAMDAQuest.mainGame);
LAMDAQuest.game.state.add('tutorial', LAMDAQuest.tutorial);
LAMDAQuest.game.state.add('gameOver', LAMDAQuest.gameOver);

LAMDAQuest.game.state.start('boot');