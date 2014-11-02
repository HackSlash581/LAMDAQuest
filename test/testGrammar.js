var should = require('should');
var parser = require('../parser/hackSlash');

describe('HackSlash Parser', function() {
	function exec(input) {
		return parser.parse(input);
  }
  it('recognizes valid statements in the language', function() {
  	exec('tunic.color: "blue"').should.be.true;
		exec('if 5 > 2: heal').should.be.true;
		exec('every 2000: attack').should.be.true;
  })
});





