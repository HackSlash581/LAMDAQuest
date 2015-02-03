var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.globals = {
  "width": 720,
  "height": 560
};

LAMDAQuest.game = new Phaser.Game(LAMDAQuest.globals.width, LAMDAQuest.globals.height, Phaser.AUTO, 'gameDiv');

LAMDAQuest.game.state.add('boot', LAMDAQuest.boot);
LAMDAQuest.game.state.add('preload', LAMDAQuest.preload);
LAMDAQuest.game.state.add('mainGame', LAMDAQuest.mainGame);
LAMDAQuest.game.state.add('pause', LAMDAQuest.pause);

LAMDAQuest.game.state.start('boot');