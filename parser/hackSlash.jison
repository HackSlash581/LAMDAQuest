/* HackSlash grammar */


%left EQUALITY GTHAN LTHAN GTHANEQ LTHANEQ
%left PLUS MINUS 
%left TIMES DIVIDED

%%

script
	: EVERY INT COLON propertychain
	| IF expr COLON ifbody
	| assignment
	;

ifbody
	: assignment
	| propertychain
	;

assignment
	: propertychain COLON newprop
	;

newprop
	: STRVAL
	| INT
	| FLOAT
	| ID
	;

propertychain
	: propertychain DOT ID
	| ID
	;

expr
	: propertychain comparison INT
	| propertychain comparison propertychain
	| INT comparison propertychain
	| INT comparison INT
	;

side
	: propertychain
	| INT
	| FLOAT
	;

comparison
	: EQUALITY
	| GTHAN
	| LTHAN
	| GTHANEQ
	| LTHANEQ
	;

