var express = require('express');
var router = express.Router();

router.post('/scripting', function(req, res) {
  res.set({'Content-Type': 'application/json'});
  res.status(200);
  res.send("server");
  return;
});

module.exports = router;
