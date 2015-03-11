var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.menuState = function() {};
LAMDAQuest.menuState.prototype = {
  
  create: function(){
    //add a background image
    this.game.add.image(0, 0, 'background_menu');
    //display name of game
    var nameLabel = this.game.add.text(350, 150,
             'L.A.M.D.A Quest',
          {font: '40px Arial', fill: '#fffff0'});
    nameLabel.anchor.setTo(0.5, 0.5);

    //tell user how to start the game
    var startLabel = this.game.add.text(350, 400,
            'press the enter key to start',
            {font: '20px Arial', fill: '#ffffff'});
    startLabel.anchor.setTo(0.5, 0.5);

    var startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    //when 'enter' is pressed, it will call the 'start' function
    startKey.onDown.addOnce(this.start, this);
  },

  start: function(){
    //start the actual game
    this.game.state.start('tutorial');
  },

}
