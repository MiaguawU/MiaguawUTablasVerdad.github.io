//que debemos hacer?
//pasar inputs
//regresar el resultado
//aqui solo direccionamos y validamos
import { gen_grafo } from './funciones/grafos.js';
import { gen_circ_log } from './funciones/boolean.js';
import { rel_suma,rel_producto } from './funciones/grafos/relac_modular.js';
import { mod_n } from '../2doPa/funciones/modulo.js';

export async function dir_grafos(n,m,id1,id2){
    
    const grafo1= await gen_grafo(n,m,id1,"rel_producto");
    const grafo2= await gen_grafo(n,m,id2,"rel_suma");

    console.log(grafo1.simetrica);
    return { grafo1, grafo2 };
}

export async function dir_boolean(lis, id) {
    let lista = lis.includes(", ") ? lis.split(", ") : lis.includes("-") ? armar_lista(lis) : lis.split(",");
    
    if (!lista_valida(lista)) {
        return false;
    }
    const { tabla, funcion }= await gen_circ_log(lista,id)
    return { tabla, funcion };
}

function armar_lista(lis) {
    let lugares = lis.split("-").map(Number); 

    if (lugares.length !== 2) {
        throw new Error("El formato para rangos debe ser: numero-numero");
    }
    
    if (lugares[0] >= lugares[1]) {
        throw new Error("El primer número debe ser menor que el segundo");
    }

    let lista = [];
    for (let i = lugares[0]; i <= lugares[1]; i++) {
        lista.push(i);
    }
    return lista;
}

function lista_valida(lista) {
    if (!Array.isArray(lista)) {
        throw new Error("La lista no tiene un formato válido, debe ser un arreglo");
    }
    
    if (lista.length === 0) {
        throw new Error("La lista está vacía");
    }

    for (let i of lista) {
        if (isNaN(Number(i))) {
            throw new Error(`La lista debe contener solo números. Revisa este término: ${i}`);
        }
    }
    return true;
}