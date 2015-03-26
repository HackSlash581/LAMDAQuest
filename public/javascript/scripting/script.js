define(['phaser', 'LAMDAQuest'], function(Phaser, LAMDAQuest) {
  var LQ = LAMDAQuest.getLQ();

  function Script(hackScriptText, objectRef) {
    this.hackscriptText = hackScriptText;
    this.callOn = objectRef;
  }

  Script.prototype = {

  };

  Script.prototype.constructor = Script;

  return Script;
});