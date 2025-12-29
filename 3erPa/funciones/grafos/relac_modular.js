export function rel_suma(x, y, n, m) {
    // [x]n + [y]n = [m]n  -> (x + y) mod n === m
    return (x + y) % n === m;
}

export function rel_producto(x, y, n, m) {
    // [x]n * [y]n = [m]n  -> (x * y) mod n === m
    return (x * y) % n === m;
}

globalThis.rel_suma = rel_suma;
globalThis.rel_producto = rel_producto;