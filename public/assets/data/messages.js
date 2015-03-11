define(function() {
  var data = (function() {
    var messageStatus = {
      "intro": false,
      "next": false
    };

    return {
      loadMessages: function() {  
        return {
          "tutorial": {
            "intro": "Find the blue flame.",
            "win": "You win!."
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
  }());

  return data;
});
