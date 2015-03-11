define(['phaser'], function(Phaser) {
  'use strict';

  //Create a singleton LAMDAQuest object that can be accessed from anywhere
  var LQ = (function() {
    var LQinstance;

    function createInstance() {
      var instance = new LAMDAQuest();
      return instance;
    }

    return {
      getLQ: function() {
        if(!LQinstance) {
          LQinstance = createInstance();
        }
        return LQinstance;
      }
    };

    function LAMDAQuest() {
      this.globals = {
        "width": 800,
        "height": 600,
        "paused": false
      };

      this.game = new Phaser.Game(
        this.globals.width,
        this.globals.height,
        Phaser.AUTO, 'gameDiv'
      );
    }

    LAMDAQuest.prototype = {
      
    };

    LAMDAQuest.prototype.constructor = LAMDAQuest;

  }());

  return LQ;
});