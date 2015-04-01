var should = require('should');

var Script = function(hackScriptText, objectRef) {
  this.hackscriptText = hackScriptText;
  this.callingObject = objectRef;
  this.scriptType = this.determineScriptType(hackScriptText);
};

Script.prototype = {
  determineScriptType: function(scriptText) {
    var typeRegex = /^if |^every /;
    var scriptType = scriptText.match(typeRegex);
    return scriptType ? scriptType[0].trim() : 'assignment';
  }
};

Script.prototype.constructor = Script;

describe('Script', function () {
  it('correctly identifies "if" script', function() {
    var script = new Script("if health < 5: heal");
    should.strictEqual('if', script.scriptType);
  });

  it('correctly identifies "every" script', function() {
    var script = new Script("every 2000: heal");
    should.strictEqual('every', script.scriptType);
  });

  it('correctly identifies assignment', function() {
    var script = new Script("health: 200");
    should.strictEqual('assignment', script.scriptType);
  });
});