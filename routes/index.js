var express = require('express');
var router = express.Router();
var hackScript = require('hackscript/lib/hackScript.js');
var newline = String.fromCharCode(13, 10);

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
  try {
    var result = hackScript.compileLine(script);
  } catch(err) {
    htmlErrorMessage = err.message.replace(/\\n/gm, "<br/>");
    console.log(htmlErrorMessage);
    res.status(400);
    res.send("HackScript syntax error: " + htmlErrorMessage);
    return;
  }
  res.status(200);
  res.send(result);
});

module.exports = router;
