/* HackSlash grammar */


%left EQUALITY GTHAN LTHAN GTHANEQ LTHANEQ
%left PLUS MINUS 
%left TIMES DIVIDED

%start script

%%

script
	: "EVERY" "INT" ":" propertychain
	| "IF" expr ":" ifbody
	| assignment
	;

ifbody
	: assignment
	| propertychain
	;

assignment
	: propertychain ":" newprop
	;

newprop
	: "STRVAL"
	| "INT"
	| "ID"
	;

propertychain
	: propertychain "." "ID"
	| "ID"
	;

expr
	: propertychain comparison "INT"
	| propertychain comparison propertychain
	| "INT" comparison propertychain
	| "INT" comparison "INT"
	;

side
	: propertychain
	| "INT"
	;

comparison
	: "="
	| ">"
	| "<"
	| ">="
	| "<="
	;
