export function agregarParentesis(arr, orden) {//validado
    const array = [...arr];          
    const ordenArr = [...orden];     

    const maxOrden = Math.max(...ordenArr);
    if (maxOrden <= 0) {            //no hay nada no hacemos nada jsjs
    //console.log(array.join(""));
    return array.join("");
    }

    //recorremos de mayor a menor para que los splices no rompan indices pendientes
    for (let j = maxOrden; j >= 1; j--) {
    let idx = ordenArr.indexOf(j);
    if (idx === -1) continue;

    //debe tener izquierdo y derecho
    if (idx <= 0 || idx >= array.length - 1) {
        console.warn(`orden ${j} en indice ${idx} no tiene vecinos validos.`, { array, ordenArr });
        continue;
    }

    const izquierda = array[idx - 1];
    const operador  = array[idx];
    const derecha   = array[idx + 1];

    //nueva expresion
    const nuevo = `(${izquierda} ${operador} ${derecha})`;

    //reemplaza en ambos arrays (3 elementos asi que 1)
    array.splice(idx - 1, 3, nuevo);
    ordenArr.splice(idx - 1, 3, 0); //ponemos 0 para mantener consistencia de longitudes
    }
    let resultado = array.join("").match(/\(|\)|AND|OR|NOT|THEN|IF|[a-zA-Z]+/g)
    return resultado;
}
