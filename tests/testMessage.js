// Terrible hack.  I don't know a better way to test this
// so I'm just repeating the code for now.
var should = require('should');
var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.Message = function(messageText) {
  // The actual text of the message
  this.text = messageText;
  // The number of characters in the message
  this.chars = messageText.length;
  // The number of lines, for purposes of displaying the message
  this.numLines = 0;
  // An array that holds the lines of the message.  Each element cannot
  // contain more characters than Message.CHARS_PER_LINE.  This ensures
  // that the line will fit in the text box.
  this.lines = null;

  this.init();
};

// Maximum number of characters per line
LAMDAQuest.Message.CHARS_PER_LINE = 28;

LAMDAQuest.Message.prototype = {

  init: function() {
    this.calcNumLines();
    this.populateLines();
  },

  calcNumLines: function() {
    this.numLines = Math.ceil(this.chars / LAMDAQuest.Message.CHARS_PER_LINE);
  },

  populateLines: function() {
    var re = new RegExp(".{1," + LAMDAQuest.Message.CHARS_PER_LINE + "}", "g");
    this.lines = this.text.match(re);
  }

};

LAMDAQuest.Message.prototype.constructor = LAMDAQuest.Message;

//Tests
describe('Message', function() {
  it('should be created with proper number of lines', function() {
    var m = new LAMDAQuest.Message("1234567890123456789212345678930");
    should.equal(m.numLines, 2);
    should.equal(m.lines[0], "1234567890123456789212345678");
    should.equal(m.lines[1], "930");
  })

  it('works with three lines', function() {
    var m = new LAMDAQuest.Message("123456789012345678921234567812345678901234567892123456781234567890123456789212345678");
    should.equal(m.numLines, 3);
    should.equal(m.lines[0], "1234567890123456789212345678");
    should.equal(m.lines[1], "1234567890123456789212345678");
    should.equal(m.lines[2], "1234567890123456789212345678");
  })

  it('works with one character on last line', function() {
    var m = new LAMDAQuest.Message("123456789012345678921234567812345678901234567892123456781234567890123456789212345678x");
    should.equal(m.numLines, 4);
    should.equal(m.lines[3], "x");
  })
})