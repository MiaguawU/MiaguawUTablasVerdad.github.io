import { algDiv } from "./algDiv.js";

const letras = [
    "A","B","C","D","E",
    "F","G","H","I","J",
    "K","L","M",
    "N","O","P","Q","R",
    "S","T","U","V","W",
    "X","Y","Z"
];

export function base_N(numero, base, nueva_base) {

    if(base < 2 || nueva_base < 2) {
        throw new Error("La base debe ser al menos 2");
    }
    if(base > 36 || nueva_base > 36) {
        throw new Error("No manejamos bases mayores a 36");
    }

    let decimal;
    
    if (base !== 10) {
        decimal = a_base_10(numero, base);
    }

    if (nueva_base === 10) {
        return decimal.toString();
    }

    let qTemp = decimal;
    let arr_res = [];
    
    if (qTemp === 0) return "0";

    while (qTemp > 0) {
        let division = algDiv(qTemp, nueva_base);//usamos alg de div para sacar residuo
        
        qTemp = division.cociente;
        
        let r = Number(division.residuo);

        if (r>9) {
            arr_res.push(letras[r-10]);//para sacr el simbolo
        } else {
            arr_res.push(r.toString());
        }
    }

    return arr_res.reverse().join('');//al reves para dar el numero correcto
}

export function a_base_10(numero, base) {
    if(base < 2 || base > 36) {
        throw new Error("Base invalida (2-36)");
    }

    const numStr = String(numero).toUpperCase().trim();
    
    let resultado = 0;
    let exponente = 0;

    for (let i = numStr.length - 1; i >= 0; i--) {
        const char = numStr[i];
        let valor;

        if (letras.includes(char)) {
            valor =  letras.indexOf(char) + 10;
        } 
        else if (!isNaN(char)) {
            valor =  char;
        } else {
            throw new Error(`Caracter inválido '${char}'`);
        }

        if (valor>=base) {
            throw new Error(`'${char}' no es valido en base ${base}`);
        }

        resultado += valor * (base ** exponente);// a0*11**0+ a1*11**1+ ...
        exponente++;
    }

    return resultado;
}