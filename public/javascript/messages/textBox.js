define([
  'phaser', 
  'LAMDAQuest', 
  'messages/message'
], function(Phaser, LAMDAQuest, Message) {
  var LQ = LAMDAQuest.getLQ();
  var textbox = (function() {
    var textSurfaceGroup,
      textSurface,
      textSurfaceInset,
      message,
      style,
      game,
      text,
      line,
      sound;

    return {
      createTextBox: function() {
        game = LQ.game;
        sound = LQ.message_letter;

        textSurfaceGroup = game.add.group();

        textSurface = game.add.image(game.camera.width/2.0,
          game.camera.height/2.0 - (game.camera.height/2.0)/2.0, 'textSurface');
        textSurface.anchor.setTo(0.5, 0.5);
        textSurface.scale.setTo(3, 1);
        textSurfaceGroup.add(textSurface);

        style = { 
          font: '12pt Courier New',
          fill: 'white',
          align: 'left',
          wordWrap: true,
          wordWrapWidth: game.cache.getImage('textSurface').width * 2.8
        };

        text = game.add.text(game.camera.width/2.0,
          game.camera.height/2.0 - (game.camera.height/2.0)/2.0, '', style);
        text.anchor.setTo(0.5);
      },

      showMessage: function(text) {
        message = new Message(text);

        this.showTextBox();
        LQ.globals.paused = true;
        this.nextLine();
      },

      nextLine: function() {
        if(message.index < message.numLines) {
          line = '';
          game.time.events.repeat(120, message.lines[message.index].length + 1, this.updateLine, this);
        }
      },

      messageDone: function() {
        return message.index === message.numLines ? true : false;
      },

      updateLine: function() {
        
        if(line.length < message.lines[message.index].length) {
          line = message.lines[message.index].substr(0, line.length + 1);
          text.setText(line);
          sound.play();

        } else {
          message.index++;
          var continueKey = LQ.game.input.keyboard.addKey(Phaser.Keyboard.C);
          var check = function() {
            if(continueKey.isDown) {
              if(this.messageDone()) {
                this.destroyMessage();
                this.hideTextBox();
                LQ.globals.paused = false;
              } else {
                this.nextLine();
              }
            } else {
              setTimeout(check, 100);
            }
          };
          check();
        }
      },

      destroyMessage: function() {
        text.setText("");
        message = null;
      },

      hideTextBox: function() {
        textSurfaceGroup.visible = false;
      },

      showTextBox: function() {
        textSurfaceGroup.visible = true;
      }
    };
  }());

  return textbox;
});
