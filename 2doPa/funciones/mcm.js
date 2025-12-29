import {MCD} from "./mcd.js";

export function MCM(a,b){
    let resultado = a*b / MCD(a, b);

    return resultado
}

export function MCM3(a,b,c){
    let resultado = MCM(a,MCM(b,c));

    return resultado;
}

export function MCM4(a,b,c,d){
    let resultado = MCM(a,MCM3(b,c,d));

    return resultado;
}

export function MCM5(a,b,c,d,e){
    let resultado = MCM(a,MCM4(b,c,d,e));

    return resultado;
}