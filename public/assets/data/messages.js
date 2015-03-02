var LAMDAQuest = LAMDAQuest || {};

LAMDAQuest.data = (function() {
  var messageStatus = {
    "intro": false,
    "next": false
  };

  return {
    loadMessages: function() {  
      return {
        "tutorial": {
          "intro": "Press 'c' to go to the next message. Press 'spacebar' to pause the game and access the scripting menu. " +
                   "On the pause screen, scriptable entities will blink. Click on a blinking entity to write a script for it." +
                   "The 'HackScript Help' button will answer all your questions on scripting.",
          "next": "Here's the next message.",
          
        }
      };
    },

    alreadySeen: function(key) {
      var fullKey = 'tutorial.' + key;
      return messageStatus[fullKey] ? true : false;
    },

    markAsRead: function(key) {
      var fullKey = 'tutorial.' + key;
      messageStatus[fullKey] = true;
    }
  };
})();
