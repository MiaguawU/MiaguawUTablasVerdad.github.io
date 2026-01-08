import { mod_n } from "../../../2doPa/funciones/modulo.js";
export function rel_suma(x, y, n, m) {
    // [x]n + [y]n = [m]n  -> (x + y) mod n === m
    return mod_n((x+y),n) === mod_n(m,n); //(x + y) % n
}

export function rel_producto(x, y, n, m) {
    // [x]n * [y]n = [m]n  -> (x * y) mod n === m
    return mod_n((x*y),n) === mod_n(m,n);
}

globalThis.rel_suma = rel_suma;
globalThis.rel_producto = rel_producto;