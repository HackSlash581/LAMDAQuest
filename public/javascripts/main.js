var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

LAMDAQuest.game.state.add('boot', LAMDAQuest.boot);
LAMDAQuest.game.state.add('preload', LAMDAQuest.preload);
LAMDAQuest.game.state.add('menuState', LAMDAQuest.menuState);
LAMDAQuest.game.state.add('mainGame', LAMDAQuest.mainGame);
LAMDAQuest.game.state.add('gameOver', LAMDAQuest.gameOver);


LAMDAQuest.game.state.start('boot');
