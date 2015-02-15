var express = require('express');
var router = express.Router();
var hackScript = require('hackscript/lib/hackScript.js');

hackScript.compileLine = function(input) {
  var file = "placeholder";
  var output = hackScript.compile(input, {
    originalFilename: file
  }).toStringWithSourceMap({
    file: file.replace(/\.[\w]+$/, ".js.map")
  });

  return output.code;
};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/scripting/:script', function(req, res) {
  var script = req.params.script;
  var result = hackScript.compileLine(script);
  res.status(200);
  res.send(result);
});

module.exports = router;
