import { mod_n } from "./modulo.js";
export function esPrimo(input) {
    try {
        const num = BigInt(input);

        if (num < 2n) return false;
        
        if (num === 2n) return true;
        
        if (mod_n(num,2n) === 0n) return false;

        for (let i = 3n; i * i <= num; i += 2n) {
            if (mod_n(num,i) === 0n) {
                return false;
            }
        }
        
        return true;

    } catch (error) {
        throw new Error("El valor debe ser convertible a un entero (BigInt)");
    }
}