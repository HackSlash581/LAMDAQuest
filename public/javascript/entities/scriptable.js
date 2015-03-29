define(['phaser', 'LAMDAQuest'], function(Phaser, LAMDAQuest) {
  var game = LAMDAQuest.getLQ().game;

  var Scriptable = function() {
    this.scriptableProperties = [];
    this.ifScript = null;
    this.intervalScript = null;
    this.intervalDelta = null;
    this.intervalEvent = null;
    this.displayName = null;
    this.intervalTimer = new Phaser.Timer(game, false);
  };

  Scriptable.prototype = {
    callScripts: function() {
      if(this.ifScript) {
        this.ifScript();
      }
      if(this.intervalScript) {
        if(intervalDeltaHasEllapsed) {
          this.intervalScript();
        }
      }
    },

    intervalDeltaHasEllapsed: function() {

    },

    addIntervalScript: function(script, delta) {
      this.intervalDelta = delta;
      this.intervalScript = script;
      this.intervalEvent = this.intervalTimer.add(delta, script, this);
    },

    removeIntervalScript: function() {
      this.intervalDelta = null;
      this.intervalScript = null;
      this.intervalTimer.remove(this.intervalEvent);
      this.intervalEvent = null;
    }
  };

  Scriptable.prototype.constructor = Scriptable;

  return Scriptable;
});