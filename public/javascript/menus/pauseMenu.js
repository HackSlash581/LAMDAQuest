define([
  'phaser', 
  'LAMDAQuest',
  'input/input'
], function(Phaser, LAMDAQuest, Input) {
  var LQ = LAMDAQuest.getLQ();
  var pause = (function() {
    // private variables
    var darkRectangle;

    // private methods
    function darkenScreen(game) {
      darkRectangle = game.add.graphics(0, 0);
      darkRectangle.lineStyle(1, 0x000000, 0.3);
      darkRectangle.beginFill(0x000000, 0.3);
      darkRectangle.drawRect(game.world.x, game.world.y, game.world.width, game.world.height);
      darkRectangle.endFill();
    }

    function testPausedInput(player) {
      var game = LQ.game;
      
      $('#scriptingModal').on('show.bs.modal', function(event) {
        $('#scriptingModal .modal-title').text('Scripting Pane for ' + player.displayName);
        $('#syntaxAlert').hide();
        game.paused = true;
        LQ.modalUp = true;
      });
      $('#scriptingModal').on('hidden.bs.modal', function(event) {
        game.paused = false;
        LQ.modalUp = false;
        $('#scriptingModal').find("input").val('').end()
      });
      $("#scriptingModal").modal().find("#objectProperties").html(
        "<ul class='list-group'>" +
          "<li class='list-group-item'>objectId: " + "<span class='badge'>player</span></li>" +
          "<li class='list-group-item'>x:" + "<span class='badge'>" + player.x + "</span></li>" +
          "<li class='list-group-item'>y:" + "<span class='badge'>" + player.y + "</span></li>" +
          "<li class='list-group-item'>speed:" + "<span class='badge'>" + player.speed + "</span></li>" +
          "<li class='list-group-item'>displayName:" + "<span class='badge'>" + player.displayName + "</span></li>" +
        "</ul>"
      );

      $('#submitScript').click(submitScript);

      function submitScript(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        $.ajax({
          type: 'POST',
          url: '/scripting/' + $('#script-text').val(),

          success: function(data, xhr) {
            var script = "player." + data;
            eval(script);
            $('#syntaxAlert').hide();
            $('#scriptingModal').find("input").val('').end().modal('toggle');
          },

          error: function(jqXHR) {
            $('#syntaxAlert').html(jqXHR.responseText);
            $('#syntaxAlert').show();
          }
        });
      }
    }

    function clearInput() {
      LQ.wasd.up.isDown = false;
      LQ.wasd.down.isDown = false;
      LQ.wasd.right.isDown = false;
      LQ.wasd.left.isDown = false;
    }
    // TODO: This should be in player.js
    function freezePlayer() {
      LQ.player.animations.stop();
      LQ.player.body.velocity.x = 0;
      LQ.player.body.velocity.y = 0;
    }
    
    // TODO: Move to player.js
    //Called when the player is moused over in the pause menu.
    //It would be cool to float a little text box with the entity's 
    //name to make it more obvious that this entity is scriptable.
    function showName(player) {
      console.log(player.displayName);
    }

    return {
      // public methods
      pauseGame: function(event) {
        var player = LQ.player;
       

        if(!LQ.globals.paused && !LQ.modalUp) {
          LQ.globals.paused = true;
          clearInput();
          darkenScreen(this.game);
          
          // Pause everything else we eventually add (projectiles, etc.)

          /********Need to do this for each scriptable entity*********/
          freezePlayer();
          player.bringToTop();
          player.alpha = 0;
          player.pauseTween = LQ.game.add.tween(player).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
          player.inputEnabled = true;
          Input.toggleWASDCapture();
          Input.toggleSpaceCapture();
          LQ.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.C);
          player.events.onInputDown.add(this.testPausedInput, LQ);
          player.events.onInputOver.add(this.showName, LQ);
          /***********************************************************/
        } else if(!LQ.modalUp) {
          LQ.globals.paused = false;
          darkRectangle.destroy();
          //Stop the tweens for each entity
          player.pauseTween.stop();
          player.inputEnabled = false;
          player.events.onInputDown.remove(this.testPausedInput, LQ);
          player.alpha = 1;
          Input.toggleWASDCapture();
          Input.toggleSpaceCapture();
          LQ.game.input.keyboard.addKeyCapture(Phaser.Keyboard.C);
        }
      }
    };
  }());

  return pause;
});
