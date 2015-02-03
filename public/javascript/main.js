var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.game = new Phaser.Game(720, 560, Phaser.AUTO, 'gameDiv');

LAMDAQuest.game.state.add('boot', LAMDAQuest.boot);
LAMDAQuest.game.state.add('preload', LAMDAQuest.preload);
LAMDAQuest.game.state.add('mainGame', LAMDAQuest.mainGame);

LAMDAQuest.game.state.start('boot');