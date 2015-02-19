var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.Message = function(messageText) {
  // The actual text of the message
  this.text = messageText;
  // The number of characters in the message
  this.chars = messageText.length;
  // The number of lines, for purposes of displaying the message
  this.numLines = 0;
  // An array that holds the lines of the message.  Each element cannot
  // contain more characters than Message.CHARS_PER_LINE.
  this.lines = null;
  // Keeps track of which line is currently being rendered
  this.index = 0;

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