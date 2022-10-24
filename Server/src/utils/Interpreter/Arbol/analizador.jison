%{
    //codigo js
    const controller = require('../../../controller/parser/parser');
    const errores = require('./Exceptions/Error');
    const nativo = require('./Expresiones/Nativa');
    const Tipo = require('./Simbolos/Tipo');
    const impresion = require('./Instrucciones/Imprimir');    
    const declaracion = require('./Instrucciones/Declaracion');
    const aritmetico = require('./Expresiones/Aritmetica')
%}
%lex 


%options case-insensitive 
//inicio analisis lexico
%%
"imprimir"      return 'RESPRINT';
"entero"        return 'RESINT';

"="             return 'IGUAL';
"+"             return 'MAS';
";"             return 'PTCOMA';
"("             return 'PARABRE';
")"             return 'PARCIERRA';


[ \r\t]+ { }
\n {}
\"[^\"]*\"                  { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+                      return 'ENTERO';
[A-Za-z]+["_"0-9A-Za-z]*    return 'IDENTIFICADOR';

<<EOF>>                     return 'EOF';
.                           return 'INVALID'

/lex
%left 'MAS'     

%start INIT
//Inicio
//Definicion de gramatica
%%

INIT: INSTRUCCIONES EOF     {return $1;}
;

INSTRUCCIONES : 
    INSTRUCCIONES INSTRUCCION   {$1.push($2); $$=$1;}
    | INSTRUCCION               {$$=[$1];}
;

INSTRUCCION :
    IMPRIMIR                {$$=$1;}
    | DECLARACION           {$$=$1;}
    | INVALID               {controller.listaErrores.push(new errores.default('ERROR LEXICO', $1, @1.first_line, @1.first_column));}
    | error  PTCOMA         {controller.listaErrores.push(new errores.default('ERROR SINTACITICO',"Se esperaba un token", @1.first_line, @1.first_column));}
;

IMPRIMIR : 
    RESPRINT PARABRE EXPRESION PARCIERRA PTCOMA {$$=new impresion.default($3,@1.first_line,@1.first_column);}
;

DECLARACION:
    RESINT IDENTIFICADOR IGUAL EXPRESION PTCOMA {$$=new declaracion.default($2, new Tipo.default(Tipo.TipoDato.ENTERO), $4, @1.first_line, @1.first_column);}
;

EXPRESION :
    EXPRESION MAS EXPRESION {$$ = new aritmetico.default(aritmetico.tipoOp.SUMA, $1, $3, @1.first_line, @1.first_column)}
    |IDENTIFICADOR {$$= new nativo.default(new Tipo.default(Tipo.TipoDato.IDENTIFICADOR), $1, @1.first_line, @1.first_column);}
    | ENTERO {$$= new nativo.default(new Tipo.default(Tipo.TipoDato.ENTERO),$1, @1.first_line, @1.first_column);}
    | CADENA {$$= new nativo.default(new Tipo.default(Tipo.TipoDato.CADENA),$1, @1.first_line, @1.first_column);}
;

