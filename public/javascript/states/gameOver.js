var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.gameOver = function() {};
LAMDAQuest.gameOver.prototype = {
	
	create: function(){
		//add a background image

		this.game.add.image(0, 0, 'background_gameover');

		var nameLabel = this.game.add.text(400, 170,
						 "You are Dead!!! Don't mess with the beaver...",
					{font: '30px Arial', fill: '#fffff0'});
		nameLabel.anchor.setTo(0.5, 0.5);

		//tell user how to start the game
		var restartLabel = this.game.add.text(400, 425,
						"Press the enter key to return to menu.",
						{font: '25px Arial', fill: '#ffffff'});
		restartLabel.anchor.setTo(0.5, 0.5);

		var startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		//when 'startKey' is pressed, it will call the 'start' function
		startKey.onDown.addOnce(this.start, this);
	},

	start: function(){
		//start the actual game
		this.game.state.start('menuState');
	},

}
