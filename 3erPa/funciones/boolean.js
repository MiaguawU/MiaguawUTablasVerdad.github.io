/*
mmmm, ocupamos usar el convertidor de bases de base 2 a 10
creo que para la tabla, como es muy simple solo generare las varibles? se 
llaman asi?
Todo dentro de un array
En otro array tendremos los numero en base 2 pero en base 10
    seria tipo recorrer la tabla en la fila x tipo tabla[columna][x]
    y luego por cada fila se guarda en el array nuevo como numero base 10
Para la ultima columna tendremos si es igual a algun numero ingresado 
que tmb es un array, retormanos la tabal
*/
/*
Para la FND contaremos los 1 de la ultima colm, se formaran grupos, necesitamos
concatenar los grupos, como siempre es el mismo formato y solo varia las 
negaciones eso lo sacamos con los ceros de la tabla, 
retornamos eso
*/
/*
Circuitos, la parte grafica, sera que use una clase?
que haria la clase?
hay and
or
not
y hasta ahi 
pues lo mismo que el grafo pero para circuito
*/
import { gen_AND,gen_OR, gen_inputs, conectar, final,init_svg } from "./circuitos/HTML/ele_visual.js";
import { Circuito_Logico } from "./circuitos/claseCirc.js";
import { gen_FND } from "./circuitos/FND.js";
import { gen_tabla } from "./circuitos/tabla.js";

//cinfiguraciones y funciones para html (para ver el circuito)
const config = {
    busX: 60,
    busSpacing: 35,
    gateColumnX: 500,
    orColumnX: 850,
    strokeWidth: 2.5,
    verticalGap: 80,
    svg:null,
    colores: {},
    connectionPoints: {},
    limites:null
};

let funciones={
    input:(vars, config)=> gen_inputs(vars, config),
    or: (esFinal, comp, id,config) => gen_OR(esFinal, comp, id,config),
    and:(esFinal, comp, id,config) =>gen_AND(esFinal, comp, id,config),
    conexion:(inId, esFinal, info,i,config) =>conectar(inId, esFinal, info,i,config),
    inicio: async (id,vars,mapa,config) => await init_svg(id,vars,mapa,config),
    fin:(id,out,config) =>final(id,out,config)
}

export async function gen_circ_log(lista,id){
    let tabla=gen_tabla(lista);
    let funcion=gen_FND(tabla);

    let circuito= new Circuito_Logico(funcion,config,funciones,id);
    circuito.vista();

    console.log(tabla)

    return { tabla, funcion };
}