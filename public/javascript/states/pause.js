var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.pause = function() {};

LAMDAQuest.pause.prototype = {
	create: function() {
    this.graphics = this.game.add.graphics(0,0);
    this.graphics.lineStyle(1, 0xFFFFFF, 0.2);
    this.graphics.beginFill(0xFFFFFF, 0.2);
    this.graphics.drawRect(0, 0, LAMDAQuest.globals.width, LAMDAQuest.globals.height);
	},

	update: function() {

    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      //TODO: Compile scripts and attach to objects
      //Save necessary state info
      this.game.state.start('mainGame');
    }
	}
};