/* Tokens for the HackSlash language */

DIGIT						[0-9]
ID							[a-zA-Z][a-zA-Z0-9_]*
STRVAL					\".*\"

%%
\s+ 											/* ignore whitespace */
{ID}											return 'ID';
{DIGIT}+									return 'INT';
{DIGIT}\.?{DIGIT}+				return 'FLOAT';
":"												return 'COLON';
"."												return 'DOT';
"="                       return 'EQUALITY';
"+"                       return 'PLUS';
"-"                       return 'MINUS';
"*"                       return 'TIMES';
"/"												return 'DIVIDE';
">"                       return 'GTHAN';
"<"												return 'LTHAN';
">="											return 'GTHANEQ';
"<="											return 'LTHANEQ';
"if"											return 'IF';
"every"										return 'EVERY';
{STRVAL}+									return 'STRVAL';