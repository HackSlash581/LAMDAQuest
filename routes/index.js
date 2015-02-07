var express = require('express');
var router = express.Router();
var entity;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/scripting/:entityJSON', function(req, res) {
  entity = entityJSON;
  return;
});

router.get('/scripting', function(req, res) {
  res.set({'Content-Type': 'application/json'});
  res.status(200);
  res.send(entity);
  return;
});

module.exports = router;
