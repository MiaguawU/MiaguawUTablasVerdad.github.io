import { algDiv } from "./algDiv.js"; 

export function algEucl(a, b) {
    let proceso = {
        a: [],
        b: [],
        q: [],
        r: [],
        pasos: [], 
        resultado: 0
    };

    if (a < 0) a = -a;
    if (b < 0) b = -b;

    if (a===0 && b===0) {
        return proceso; 
    }

    while (b!==0) {
        
        const operacion = algDiv(a, b);

        proceso.a.push(operacion.dividendo);
        proceso.b.push(operacion.divisor);
        proceso.q.push(operacion.cociente);
        proceso.r.push(operacion.residuo);

        const pasoTexto = `${operacion.dividendo} = ${operacion.divisor}(${operacion.cociente}) + ${operacion.residuo}`;
        proceso.pasos.push(pasoTexto);

        a = operacion.divisor; 
        b = operacion.residuo; 
    }

    proceso.resultado = a;
    
    return proceso;

}