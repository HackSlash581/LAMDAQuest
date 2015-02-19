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
          "intro": "Hi.  Welcome to LAMDAQuest! Here is the next line of text!",
          "next": "Here's the next message."
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
