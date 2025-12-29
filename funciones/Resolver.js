export function Resolver(operador,columnaIzquierda,columnaDerecha,filas,nombreColumna){//
    const op = operador;
    const izquierda = columnaIzquierda;
    const derecha = columnaDerecha;
    const fi = filas+1;
    const nomColm= nombreColumna;
    let resultado = [];

    resultado.push(nomColm);
    if ((!Array.isArray(izquierda)&&op!=="NOT") || !Array.isArray(derecha)) {
        console.error("⚠️ Parámetros inválidos:", { izquierda, derecha });
        throw new Error("❌ columnaIzquierda y columnaDerecha deben ser arrays");
    }
    if(op==="NOT"){
        for(let i=1; i<fi; i++){//empezamos en 1 para no usar el nombre de columna
            if(derecha[i]===1){
                resultado.push(0);
            }
            if(derecha[i]===0){
                resultado.push(1);
            }
        }
    }
    if(op==="OR"){
        for(let i=1; i<fi; i++){//empezamos en 1 para no usar el nombre de columna
            if(izquierda[i]===1 || derecha[i]===1){
                resultado.push(1);
            }
            else{
                resultado.push(0);
            }
        }
        //console.log("Resultado con OR, izq: "+izquierda+" derec: "+derecha);
        //console.log(izquierda);
        //console.log(derecha);
        //console.log(resultado);
    }
    if(op==="AND"){
        for(let i=1; i<fi; i++){//empezamos en 1 para no usar el nombre de columna
            if(izquierda[i]===1 && derecha[i]===1){
                resultado.push(1);
            }
            else{
                resultado.push(0);
            }
        }
        //console.log("Resultado con AND, izq: "+izquierda+" derec: "+derecha);
        //console.log(izquierda);
        //console.log(derecha);
    }
    if(op==="THEN"){
        for(let i=1; i<fi; i++){//empezamos en 1 para no usar el nombre de columna
            if(izquierda[i]===1 && derecha[i]===0){
                resultado.push(0);
            }
            else{
                resultado.push(1);
            }
        }
        //console.log("Resultado con THEN, izq: "+izquierda+" derec: "+derecha);
        //console.log(izquierda);
        //console.log(derecha);
        //console.log(resultado);
    }
    if(op==="IF"){
        for(let i=1; i<fi; i++){//empezamos en 1 para no usar el nombre de columna
            if(izquierda[i]===derecha[i]){
                resultado.push(1);
            }
            else{
                resultado.push(0);
            }
        }
        console.log("Resultado con IF, izq: "+izquierda+" derec: "+derecha);
        console.log(izquierda);
        console.log(derecha)
        console.log(resultado);
    }

    return resultado;
}