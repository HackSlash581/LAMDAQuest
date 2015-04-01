define(['phaser', 'LAMDAQuest'], function(Phaser, LAMDAQuest) {
  var LQ = LAMDAQuest.getLQ();

  var Script = function(hackScriptText, objectRef) {
    this.hackscriptText = hackScriptText;
    this.callingObject = objectRef;
    this.scriptType = this.determineScriptType(hackScriptText);
  }

  Script.prototype = {
    determineScriptType: function(scriptText) {
      var typeRegex = /^if |^every /;
      var scriptType = scriptText.match(typeRegex);
      return scriptType ? scriptType[0].trim() : 'assignment';
    }
  };

  Script.prototype.constructor = Script;

  return Script;
});