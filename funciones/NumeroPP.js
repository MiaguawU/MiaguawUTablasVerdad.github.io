import { QueOperador } from "./QueOperador.js";
import { SinParentesisArrayConOperadores } from "./SinParentesis.js";

export function NumeroColumnaDePP(columnaActual, arrayPP) {//valido
    if (!arrayPP || arrayPP.length === 0) {
        console.log("arrayPP está vacío");
        return { izquierda: -1, derecha: -1, operador: null }; 
    }
    
    const pp = [...arrayPP];
    //console.log("pp: "+pp)
    let arrTemp = [...SinParentesisArrayConOperadores(columnaActual)];
    //console.log("arrtemp pero de ques in apren "+arrTemp)
    //console.log(arrTemp)
    let columnapp = -1;
    let contpp = 0;
    let columnapp2 = -1;
    let op;

    for (let j = 0; j < arrTemp.length; j++) {
        for (let i = 0; i < pp.length; i++) {
            if (arrTemp[j].length === 1 && arrTemp[j]===pp[i]) {
                contpp++;
                if (contpp === 1) {
                    columnapp = i; 
                    //console.log("columna i: "+pp[i]+"numeroc columna de arrTemp")
                    break;
                } else if (contpp === 2) {
                    columnapp2 = i;
                    //console.log("Columna derecha: "+i) 
                    return { izquierda: columnapp, derecha: columnapp2, operador: op };
                }
            } 
        }
        if (arrTemp[j].length === 1) continue; 
        else {
                op = QueOperador(arrTemp[j]);
            }
    }

    if (contpp === 1) {
        return { izquierda: columnapp, derecha: null, operador: op };
    }

    return { izquierda: -1, derecha: -1, operador: op || null };
}