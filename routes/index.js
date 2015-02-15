var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/scripting/:script', function(req, res) {
  var script = req.params.script;
  res.status(200);
  res.send(script);
});

module.exports = router;
