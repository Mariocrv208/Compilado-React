%{      
	const TIPO_OPERACION = require('./Controlador/Tipos/TipoOperacion');
	const TIPO_VALOR = require('./Controlador/Tipos/TipoValor');
	const TIPO_DATO = require('./Controlador/Tipos/TipoDato'); //para jalar el tipo de dato
	const Instruccion = require('./Controlador/Instrucciones/NodoIns');
        const TIPO_FUNC_NATIVA = require('./Controlador/Tipos/TipoFuncNativa')

        function toBool(texto) {
                if (texto == "true") {
                        return true
                }
                return false
        }

        let idSentencia = 1;
        let respuesta = {
                listaIns: [],
                errorSintactico: ""
        };
%}

//____________________________________________________________________________________

%lex
%options case-insensitive
%%

[\n\t\s\r]+                             {} // Espacios en blanco
"//".*                                  {} // Comentario de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     {} // Comentario multilinea

"int"                 return 'int'
"double"              return 'double'
"boolean"             return 'boolean'
"char"                return 'char'
"string"              return 'string'
"true"                return 'true'
"false"               return 'false'
"||"                  return 'or'
"&&"                  return 'and'
"=="                  return 'igualIgual'
"!="                  return 'noIgual'
"!"                   return 'admiracion'
">="                  return 'mayorIgual'
"<="                  return 'menorIgual'
"<"                   return 'menor'
"if"                  return 'if'
"else"                return 'else'
"switch"              return 'switch'
"case"                return 'case'
"break"               return 'break'
"default"             return 'default'
"while"               return 'while'
"continue"            return 'continue'
"for"                 return 'for'
"do"                  return 'do'
"return"              return 'return'
"void"                return 'void'
"new"                 return 'new'
"list"                return 'list'
"add"                 return 'add'
"print"               return 'print'
"toLower"             return 'toLower'
"toUpper"             return 'toUpper'
"length"              return 'length'
"truncate"            return 'truncate'
"round"               return 'round'
"typeOf"              return 'typeOf'
"toString"            return 'ToString'
"toCharArray"         return 'toCharArray'
"run"                 return 'run'



"#"     return 'hash'
"$"     return 'dolar'
"%"     return 'modulo'
"&"     return 'amberson'
"("     return 'parentesisA'
")"     return 'parentesisC'
"*"     return 'asterisco'
"++"    return 'masMas'
"+"     return 'mas' 
","     return 'coma'
"--"    return 'menosMenos'
"-"     return 'menos'
"."     return 'punto' 
"/"     return 'slash'
":"     return 'dosPts'
";"     return 'ptyComa'
"="     return 'igual' 
">"     return 'mayor'
"?"     return 'interrogacion'
"@"     return 'arroba' 
"["     return 'corcheteA'
"\\"    return 'slashInverso'
"]"     return 'corcheteC'
"^"     return 'sombrero' 
"_"     return 'underScore' 
"{"     return 'llaveA'
"|"     return 'barra'
"}"     return 'llaveC'
"~"     return 'colocho'

([a-zA-Z])([a-zA-Z0-9_])*   return 'identificador'
[a-zA-Z]                    return 'letra'
[0-9]+("."[0-9]+)\b         return 'decimal'
[0-9]+\b                    return 'entero'
\"((\\\")|[^\n\"])*\"   { yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
\'((\\\')|[^\n\'])\'	{ yytext = yytext.substr(1,yyleng-2); return 'caracter'; }


<<EOF>>               return 'EOF'      /* End of File */
.                     { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

//____________________________________________________________________________________

/* Precedencia de operadores */
%left 'interrogacion' cast
%left 'or'
%left 'and'
%right 'admiracion'
%left 'igualIgual' 'noIgual'  'menor' 'menorIgual' 'mayor' 'mayorIgual'
%left 'mas' 'menos' 'masMas' 'menosMenos'
%left 'slash' 'asterisco' 'modulo'
%left 'sombrero'
%right uMenos
%left 'parentesisA' 'parentesisC'

%start INICIO
%%

INICIO: LISTA_INSTRUCCIONES EOF { respuesta.errorSintactico = ""; respuesta.listaIns = $1; return respuesta; }
        | error ptyComa         { respuesta.errorSintactico  =  "Error Sintactico: " + "Linea: "  + (this._$.first_line-1) + ", Columna: " + this._$.first_column ; return respuesta; }|
;

LISTA_INSTRUCCIONES: LISTA_INSTRUCCIONES INSTRUCCCION   { $1.push($2); $$=$1; }
                    |INSTRUCCCION                       { $$ = [$1]; }
;

INSTRUCCCION:   DECLARAR_VAR ptyComa            { $$ = $1; }
                |DECLARAR_FUNCION               { $$ = $1; }
                |DECLARAR_METODO                { $$ = $1; }
                |DECLARAR_VECTOR ptyComa        { $$ = $1; }
                |DECLARAR_LISTA ptyComa         { $$ = $1; }
                |AGREGAR_A_LISTA ptyComa        { $$ = $1; }
                |ASIGNACION_VAR ptyComa         { $$ = $1; }
                |INSTRUCCION_IF                 { $$ = $1; }
                |SWITCH                         { $$ = $1; }
                |WHILE                          { $$ = $1; }
                |CONTINUE                       { $$ = $1; } 
                |BREAK                          { $$ = $1; }
                |RETURN                         { $$ = $1; }
                |OPERADOR_TERANARIO ptyComa     { $$ = $1; }
                |ACTUALIZACION ptyComa          { $$ = $1; }
                |FOR                            { $$ = $1; }
                |DO_WHILE                       { $$ = $1; }
                |LLAMDA_FUNC_MET ptyComa        { $$ = $1; }
                |MODIFICAR_VECTOR ptyComa       { $$ = $1; }
                |MODIFICAR_LISTA ptyComa        { $$ = $1; }
                |FUNCION_NATIVA ptyComa         { $$ = $1; }
                |RUN ptyComa                   { $$ = $1; }
;

DECLARAR_VAR:   TIPO identificador igual EXPRESION { $$ = Instruccion.nuevaDeclaracion($2, $4, $1, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5;}
                |TIPO identificador                { $$ = Instruccion.nuevaDeclaracion($2, null, $1, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5; }
;

ASIGNACION_VAR: identificador igual EXPRESION { $$ = Instruccion.nuevaAsignacion($1, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 4; }
;
        
TIPO:   int             { $$ = TIPO_DATO.ENTERO; }
        |double         { $$ = TIPO_DATO.DECIMAL; }
        |boolean        { $$ = TIPO_DATO.BANDERA; }
        |char           { $$ = TIPO_DATO.CARACTER; }
        |string         { $$ = TIPO_DATO.CADENA; }
;

EXPRESION:  EXPRESION mas EXPRESION                     { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.SUMA, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |EXPRESION menos EXPRESION                  { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.RESTA, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |EXPRESION asterisco EXPRESION              { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MULTIPLICACION, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |EXPRESION slash EXPRESION                  { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.DIVISION, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |EXPRESION sombrero EXPRESION               { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.POTENCIA, this._$.first_line, this._$.first_column+1, idSentencia++); idSentencia += 3; }
            |EXPRESION modulo EXPRESION                 { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MODULO, this._$.first_line, this._$.first_column+1, idSentencia++);  idSentencia += 3; }
            |menos EXPRESION %prec uMenos               { $$ = Instruccion.nuevaOperacionUnaria($2, TIPO_OPERACION.UMENOS, this._$.first_line, this._$.first_column+1, idSentencia++);  idSentencia += 3; }
            |EXPRESION igualIgual EXPRESION             { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.IGUALIGUAL, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |EXPRESION noIgual EXPRESION                { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.NOIGUAL, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |EXPRESION menor EXPRESION                  { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MENOR, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |EXPRESION menorIgual EXPRESION             { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MENORIGUAL, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |EXPRESION mayor EXPRESION                  { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MAYOR, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |EXPRESION mayorIgual EXPRESION             { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.MAYORIGUAL, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |EXPRESION or EXPRESION                     { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.OR, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }                     
            |EXPRESION and EXPRESION                    { $$ = Instruccion.nuevaOperacionBinaria($1, $3, TIPO_OPERACION.AND, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |admiracion EXPRESION                       { $$ = Instruccion.nuevaOperacionUnaria($2, TIPO_OPERACION.NOT, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
            |parentesisA EXPRESION parentesisC          { $$ = $2; }
            |parentesisA TIPO parentesisC EXPRESION %prec cast     { $$ = Instruccion.nuevoCasteo($2, $4, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5 }
            |ACTUALIZACION                              { $$ = $1; }
            |identificador                              { $$ = Instruccion.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1, idSentencia); idSentencia += 2; }
            |entero                                     { $$ = Instruccion.nuevoValor(Number($1), TIPO_VALOR.ENTERO, this._$.first_line, this._$.first_column+1, idSentencia);idSentencia += 2; }
            |decimal                                    { $$ = Instruccion.nuevoValor(Number($1), TIPO_VALOR.DECIMAL, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 2; }
            |true                                       { $$ = Instruccion.nuevoValor(toBool($1), TIPO_VALOR.BANDERA, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 2; }      
            |false                                      { $$ = Instruccion.nuevoValor(toBool($1), TIPO_VALOR.BANDERA, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 2; }
            |cadena                                     { $$ = Instruccion.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 2; }
            |caracter                                   { $$ = Instruccion.nuevoValor($1, TIPO_VALOR.CARACTER, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 2; }
            |LLAMDA_FUNC_MET                            { $$ = $1; }
            |ACCESO_VECTOR                              { $$ = $1; }
            |ACCDER_A_LISTA                             { $$ = $1; }
            |OPERADOR_TERANARIO                         { $$ = $1; }
            |FUNCION_NATIVA                             { $$ = $1; }
;

ACTUALIZACION: identificador masMas             { $$ = Instruccion.nuevaActualizacion($1, TIPO_OPERACION.INCREMENTO, this._$.first_line, this._$.first_column+1, idSentencia++); }
                |identificador menosMenos       { $$ = Instruccion.nuevaActualizacion($1, TIPO_OPERACION.DECREMENTO, this._$.first_line, this._$.first_column+1, idSentencia++); }
;

INSTRUCCION_IF: IF_SIMPLE                       { $$ = Instruccion.nuevoIf($1, [], [], this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 4; }   
                |IF_SIMPLE ELSE                 { $$ = Instruccion.nuevoIf($1, [], $2, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 4; }
                |IF_SIMPLE LISTA_ELSE_IF        { $$ = Instruccion.nuevoIf($1, $2, [], this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 4; }
                |IF_SIMPLE LISTA_ELSE_IF ELSE   { $$ = Instruccion.nuevoIf($1, $2, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 4; }
;

IF_SIMPLE: if parentesisA EXPRESION parentesisC llaveA LISTA_INSTRUCCIONES llaveC { $$ = Instruccion.nuevoIfSimple($3, $6, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 8; }
        |if parentesisA EXPRESION parentesisC llaveA llaveC { $$ = Instruccion.nuevoIfSimple($3, [], this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 8; }
;

ELSE: else llaveA LISTA_INSTRUCCIONES llaveC { $$ = $3; idSentencia += 5; }
        |else llaveA llaveC { $$ = []; idSentencia += 5; }
; 

ELSE_IF: else if parentesisA EXPRESION parentesisC llaveA LISTA_INSTRUCCIONES llaveC { $$ = Instruccion.nuevoElseIf($4, $7, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 9; }
        |else if parentesisA EXPRESION parentesisC llaveA llaveC { $$ = Instruccion.nuevoElseIf($4, [], this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 9; }
;

LISTA_ELSE_IF: LISTA_ELSE_IF ELSE_IF    { $1.push($2); $$=$1; }
                |ELSE_IF                { $$ = [$1]; }
;

OPERADOR_TERANARIO: EXPRESION interrogacion EXPRESION dosPts EXPRESION { $$ = Instruccion.nuevoOpTernario($1, $3, $5, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 6; }
;

SWITCH: switch parentesisA EXPRESION parentesisC llaveA SWITCH_CUERPO llaveC { $$ = Instruccion.nuevoSwitch($3, $6, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 8; }
;

SWITCH_CUERPO: CASE_LIST DEFAULT        { $$ = Instruccion.nuevoSwitchCuerpo($1, $2, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
                |CASE_LIST              { $$ = Instruccion.nuevoSwitchCuerpo($1, [], this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
                |DEFAULT                { $$ = Instruccion.nuevoSwitchCuerpo([], $1, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
;

CASE_LIST: CASE_LIST CASE               { $1.push($2); $$=$1; }
        |CASE                           { $$ = [$1]; }
;

CASE: case EXPRESION dosPts LISTA_INSTRUCCIONES { $$ = Instruccion.nuevoCase($2, $4, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5; }
;

DEFAULT: default dosPts LISTA_INSTRUCCIONES  { $$ = $3; idSentencia += 4; }
;

BREAK: break ptyComa  { $$ = Instruccion.nuevoBreak(this._$.first_line, this._$.first_column+1, idSentencia++);}
;

CONTINUE: continue ptyComa { $$ = Instruccion.nuevoContinue(this._$.first_line, this._$.first_column+1, idSentencia++);}
;

RETURN: return EXPRESION ptyComa { $$ = Instruccion.nuevoReturn($2, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 4;}
        |return ptyComa          { $$ = Instruccion.nuevoReturn(null, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 4;}
;

WHILE: while parentesisA EXPRESION parentesisC llaveA LISTA_INSTRUCCIONES llaveC { $$ = Instruccion.nuevoWhile($3, $6, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 8; }
;

FOR: for parentesisA INICIALIZACION_FOR ptyComa EXPRESION ptyComa ACTUALIZACION_FOR parentesisC llaveA LISTA_INSTRUCCIONES llaveC { $$ = Instruccion.nuevoFor($3, $5, $7, $10, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 12; }
;

INICIALIZACION_FOR: DECLARAR_VAR { $$ = $1 }
                |ASIGNACION_VAR  { $$ = $1 }
;

ACTUALIZACION_FOR: ACTUALIZACION   { $$ = $1 }
                |ASIGNACION_VAR    { $$ = $1 }
;

DO_WHILE: do llaveA LISTA_INSTRUCCIONES llaveC while parentesisA EXPRESION parentesisC ptyComa { $$ = Instruccion.nuevoDoWhile($3, $7, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 10 }
;

DECLARAR_FUNCION: TIPO identificador parentesisA parentesisC llaveA LISTA_INSTRUCCIONES llaveC                  { $$ = Instruccion.nuevaDecMetodo($1, $2, [], [], this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 8 }
                |TIPO identificador parentesisA LISTA_PARAMETROS  parentesisC llaveA LISTA_INSTRUCCIONES llaveC { $$ = Instruccion.nuevaDecMetodo($1, $2, $4, $7, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 8 }
;

RUN: run identificador parentesisA parentesisC                        { $$ = Instruccion.nuevoExec($2, [], this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5 }
        |run identificador parentesisA LISTA_VALORES parentesisC       { $$ = Instruccion.nuevoExec($2, $4, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 6  }
;

LISTA_VALORES: LISTA_VALORES coma EXPRESION { $1.push($3); $$ = $1; }
                |EXPRESION                  { $$ = [$1]; }
;

DECLARAR_METODO: void identificador parentesisA parentesisC llaveA LISTA_INSTRUCCIONES llaveC                   { $$ = Instruccion.nuevaDecMetodo(null, $2, [], $6, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 9 }
                |void identificador parentesisA LISTA_PARAMETROS  parentesisC llaveA LISTA_INSTRUCCIONES llaveC { $$ = Instruccion.nuevaDecMetodo(null, $2, $4, $7, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 9 }
                |void identificador parentesisA parentesisC llaveA llaveC                                       { $$ = Instruccion.nuevaDecMetodo(null, $2, [], [], this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 9 }
;

LISTA_PARAMETROS: LISTA_PARAMETROS coma PARAMETRO   { $1.push($3); $$=$1; }
                |PARAMETRO                          { $$ = [$1]; }
;

PARAMETRO: TIPO identificador { $$ = Instruccion.nuevoParametro($1, $2, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 2 }
;

LLAMDA_FUNC_MET: identificador parentesisA LISTA_VALORES parentesisC   { $$ = Instruccion.nuevaLLamdaFuncionMetodo($1, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5 }
                |identificador parentesisA parentesisC                 { $$ = Instruccion.nuevaLLamdaFuncionMetodo($1, [], this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 4 }
;

DECLARAR_VECTOR: TIPO corcheteA corcheteC identificador igual new TIPO corcheteA EXPRESION corcheteC { $$ = Instruccion.nuevaDecVectorFormaUno($1, $4, $7, $9, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 11; }
                |TIPO corcheteA corcheteC identificador igual llaveA LISTA_VALORES llaveC            { $$ = Instruccion.nuevaDecVectorFormaDos($1, $4, $7, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 11; }
;

ACCESO_VECTOR: identificador corcheteA EXPRESION corcheteC { $$ = Instruccion.nuevoAccesoVector($1, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5; }
;

MODIFICAR_VECTOR: identificador corcheteA EXPRESION corcheteC igual EXPRESION { $$ = Instruccion.nuevaModVector($1, $3, $6, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 7; }
;

DECLARAR_LISTA: list menor TIPO mayor identificador igual new list menor TIPO mayor { $$ = Instruccion.nuevaDecLista($3, $5, $10, this._$.first_line, this._$.first_column+1,  idSentencia); idSentencia += 12; }
                |list menor TIPO mayor identificador igual EXPRESION { $$ = Instruccion.nuevaDecListaFormaDos($3, $5, $7, this._$.first_line, this._$.first_column+1,  idSentencia); idSentencia += 12; }
;

AGREGAR_A_LISTA: identificador punto add parentesisA EXPRESION parentesisC { $$ = Instruccion.nuevoAgregarLista($1, $5, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 7; }
;

ACCDER_A_LISTA: identificador corcheteA corcheteA EXPRESION corcheteC corcheteC { $$ = Instruccion.nuevoAccesoLista($1, $4, this._$.first_line, this._$.first_column+1,  idSentencia); idSentencia += 7; }
;

MODIFICAR_LISTA: identificador corcheteA corcheteA EXPRESION corcheteC corcheteC igual EXPRESION { $$ = Instruccion.nuevaModLista($1, $4, $8, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 9; }
;

FUNC_PRINT: print parentesisA EXPRESION parentesisC { $$ = Instruccion.nuevoPrint($3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 3; }
;

FUNC_TO_LOWER: toLower parentesisA EXPRESION parentesisC { $$ = Instruccion.nuevaFuncNativa(TIPO_FUNC_NATIVA.FUNC_TO_LOWER, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5; }
;

FUNC_TO_UPPER: toUpper parentesisA EXPRESION parentesisC { $$ = Instruccion.nuevaFuncNativa(TIPO_FUNC_NATIVA.FUNC_TO_UPPER, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5; }
; 

FUNC_LENGTH: length parentesisA EXPRESION parentesisC { $$ = Instruccion.nuevaFuncNativa(TIPO_FUNC_NATIVA.FUNC_LENGTH, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5; }
;

FUNC_TRUNCATE: truncate parentesisA EXPRESION parentesisC { $$ = Instruccion.nuevaFuncNativa(TIPO_FUNC_NATIVA.FUNC_TRUNCATE, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5; }
;

FUNC_ROUND: round parentesisA EXPRESION parentesisC { $$ = Instruccion.nuevaFuncNativa(TIPO_FUNC_NATIVA.FUNC_ROUND, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5; }
;

FUNC_TYPE_OF: typeOf parentesisA EXPRESION parentesisC { $$ = Instruccion.nuevaFuncNativa(TIPO_FUNC_NATIVA.FUNC_TYPE_OF, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5; }
;

FUNC_TO_STRING: ToString parentesisA EXPRESION parentesisC { $$ = Instruccion.nuevaFuncNativa(TIPO_FUNC_NATIVA.FUNC_TO_STRING, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5; }
;

FUNC_TO_CHAR_ARRAY: toCharArray parentesisA EXPRESION parentesisC { $$ = Instruccion.nuevaFuncNativa(TIPO_FUNC_NATIVA.FUNC_TO_CHAR_ARRAY, $3, this._$.first_line, this._$.first_column+1, idSentencia); idSentencia += 5; }
;

FUNCION_NATIVA: FUNC_PRINT          { $$ = $1 }
                |FUNC_TO_LOWER      { $$ = $1 }
                |FUNC_TO_UPPER      { $$ = $1 }
                |FUNC_LENGTH        { $$ = $1 }
                |FUNC_TRUNCATE      { $$ = $1 }
                |FUNC_ROUND         { $$ = $1 }
                |FUNC_TYPE_OF       { $$ = $1 }
                |FUNC_TO_STRING     { $$ = $1 }
                |FUNC_TO_CHAR_ARRAY { $$ = $1 }
;
