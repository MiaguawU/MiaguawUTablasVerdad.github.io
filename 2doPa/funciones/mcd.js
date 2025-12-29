import {algEucl} from "./algEucl.js" ;
//hasta 5
export function MCD(a,b){
    let resultado = algEucl(a,b).resultado; 
    return resultado;
}

export function MCD3(a,b,c){
    let resultado = MCD(a,MCD(b,c));

    return resultado;
}

export function MCD4(a,b,c,d){
    let resultado = MCD(a,MCD3(b,c,d));

    return resultado;
}

export function MCD5(a,b,c,d,e){
    let resultado = MCD(a,MCD4(b,c,d,e));

    return resultado;
}
