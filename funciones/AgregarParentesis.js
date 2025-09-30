export function agregarParentesis(arr, orden) {//validado
    const array = [...arr];          
    const ordenArr = [...orden];     

    const maxOrden = Math.max(...ordenArr);
    if (maxOrden <= 0) {            //no hay nada no hacemos nada jsjs
    //console.log(array.join(""));
    return array.join("");
    }

    //recorremos de mayor a menor para que se pongan los prioritarios
    for (let j = maxOrden; j >= 1; j--) {
        let idx = ordenArr.indexOf(j);//sacamos la psiciopn de el orden que buscamos
        if (idx === -1) continue;//si no lo encuentra pasa a la siguiente(los valores -1 no los va ni a considerar)

        //debe tener izquierdo y derecho
        if (idx <= 0 || idx>= array.length - 1) {
            console.warn(`orden ${j} en indice ${idx} no tiene vecinos validos.`, { array, ordenArr });
            continue;
        }

        const izquierda= array[idx - 1];
        const operador= array[idx];
        const derecha= array[idx + 1];

        //nueva expresion
        const nuevo = `(${izquierda} ${operador} ${derecha})`;

        //reemplaza en ambos arrays (3 elementos asi que 1)
        array.splice(idx - 1, 3, nuevo);//en la posicion del de la izq reemplazamos esos 3, por su correspondiente[p,OR,q]
        ordenArr.splice(idx - 1, 3, 0); //ahora juntamos esos 3 [(pORq)] por eso el 0
    }
    let resultado = array.join("").match(/\(|\)|AND|OR|NOT|THEN|IF|[a-zA-Z]+/g)
    return resultado;
}
