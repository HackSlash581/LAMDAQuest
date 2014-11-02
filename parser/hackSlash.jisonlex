/* Tokens for the HackSlash language */

DIGIT						[0-9]
INT							[1-9][0-9]*
ID							[a-zA-Z][a-zA-Z0-9_]*
STRVAL					\".*\"

%%
\s+ 											/* ignore whitespace */
"if"											return "IF";
"every"										return "EVERY";
{ID}											return "ID";
{INT}									    return "INT";
{DIGIT}(\.{DIGIT}+)?			return "FLOAT";
":"												return ":";
"."												return ".";
"="                       return "=";
"+"                       return "+";
"-"                       return "-";
"*"                       return "*";
"/"												return "/";
">"                       return ">";
"<"												return "<";
">="											return ">=";
"<="											return "<=";
{STRVAL}+									return "STRVAL";