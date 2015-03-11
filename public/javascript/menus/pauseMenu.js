define([
  'phaser', 
  'LAMDAQuest',
  'input/input'
], function(Phaser, LAMDAQuest, input) {
  var LQ = LAMDAQuest.getLQ();
  var pause = (function() {
    // private variable  
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
      var game = this.game;
      var mainGame = this;
      $('#scriptingModal').on('show.bs.modal', function(event) {
        $('#scriptingModal .modal-title').text('Scripting Pane for ' + player.displayName);
        $('#syntaxAlert').hide();
        game.paused = true;
        mainGame.modalUp = true;
      });
      $('#scriptingModal').on('hidden.bs.modal', function(event) {
        game.paused = false;
        mainGame.modalUp = false;
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

    // TODO: This should be in player.js
    function freezePlayer(player) {
      player.animations.stop();
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;
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
        if(!LQ.globals.paused && !this.modalUp) {
          LQ.globals.paused = true;
          input.clearInput();
          darkenScreen(this.game);
          
          // Pause everything else we eventually add (projectiles, etc.)

          /********Need to do this for each scriptable entity*********/
          freezePlayer(this.player);
          this.player.bringToTop();
          this.player.alpha = 0;
          this.player.pauseTween = this.game.add.tween(this.player).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
          this.player.inputEnabled = true;
          LAMDAQuest.INPUT.toggleWASDCapture(this);
          LAMDAQuest.INPUT.toggleSpaceCapture(this);
          LAMDAQuest.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.C);
          this.player.events.onInputDown.add(testPausedInput, this);
          this.player.events.onInputOver.add(showName, this);
          /***********************************************************/
        } else if(!this.modalUp) {
          LQ.globals.paused = false;
          darkRectangle.destroy();
          //Stop the tweens for each entity
          this.player.pauseTween.stop();
          this.player.inputEnabled = false;
          this.player.events.onInputDown.remove(testPausedInput, this);
          this.player.alpha = 1;
          input.toggleWASDCapture(this);
          input.toggleSpaceCapture(this);
          LQ.game.input.keyboard.addKeyCapture(Phaser.Keyboard.C);
        }
      }
    };
  }());

  return pause;
});
