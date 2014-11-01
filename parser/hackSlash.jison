/* HackSlash grammar */

%left PLUS MINUS TIMES DOT
%nonassoc EQUALITY GTHAN LTHAN
%nonassoc GTHANEQ LTHANEQ

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
	: side comparison side
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

