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
          "intro": "Hello.  Welcome to L.A.M.D.A. Quest",
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
