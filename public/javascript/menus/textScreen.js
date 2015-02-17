LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.TEXT = (function() {
  var textSurfaceGroup;
  var textSurface;
  var textSurfaceInset;
  var message;
  var style;

  return {
    createTextBox: function(mainGame) {
      var game = mainGame.game;

      textSurfaceGroup = game.add.group();

      textSurface = game.add.image(game.camera.width/2.0, game.camera.height/2.0, 'textSurface');
      textSurface.anchor.setTo(0.5, 0.5);
      textSurface.scale.setTo(3, 1);
      textSurfaceGroup.add(textSurface);

      textSurfaceInset = game.add.image(game.camera.width/2.0, game.camera.height/2.0, 'textSurfaceInset');
      textSurfaceInset.anchor.setTo(0.5, 0.5);
      textSurfaceInset.scale.setTo(3, 1);
      textSurfaceGroup.add(textSurfaceInset);

      style = { 
        font: '12pt Arial',
        fill: 'white',
        align: 'left',
        wordWrap: true,
        wordWrapWidth: game.cache.getImage('textSurface').width * 2.8
      };

      message = game.add.text(game.camera.width/2.0, game.camera.height/2.0, "Hello", style);
      message.anchor.setTo(0.5);
    },

    hideTextBox: function() {
      textSurfaceGroup.visible = false;
    },

    showTextBox: function() {
      textSurfaceGroup.visible = true;
    },

    writeText: function(text, game) {
      message = game.add.text(text, style);
      message.anchor.setTo(0.5);
      //message.visible = false;
      // for(var i = 0; i < text.length; i++) {
      //   message.addChild(new PIXI.Text(text[i], style), i);
      //   setTimeout(function() {
      //     message.getChildAt(i).visible = true;
      //   }, 500);
      //}
    }
  };
})();