import { mod_n } from "./modulo.js";

export function algDiv(a, b) {
    if (b === 0) {
        throw new Error("El divisor no puede ser 0");
    }
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
        throw new Error("El divisor y dividendo deben ser enteros");
    }

    let r = Number(mod_n(a, b));

    let q = (a - r) / b;

    return {
        dividendo: a,
        divisor: b,
        cociente: q,
        residuo: r
    };
}