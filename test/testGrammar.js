function exec(input) {
	return require("../parser/hackSlash").parser.parse(input);
}

console.log(exec('tunic.color: "blue"'));
console.log(exec('if 5 > 2: heal'));
console.log(exec('every 2000: attack'));

