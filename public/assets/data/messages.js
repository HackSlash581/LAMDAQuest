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
          "intro": "Press 'c' to go to the next message.",
          "next": "Here's the next message.",
          "beaver": "You killed a beaver!"
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
