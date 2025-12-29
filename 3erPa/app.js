//que debemos hacer?
//pasar inputs
//regresar el resultado
//aqui solo direccionamos
import { gen_grafo } from './funciones/grafos.js';
import { rel_suma,rel_producto } from './funciones/grafos/relac_modular.js';

export async function dir_grafos(n,m,id1,id2){
    
    const grafo1= await gen_grafo(n,m,id1,"rel_producto");
    const grafo2= await gen_grafo(n,m,id2,"rel_suma");

    console.log(grafo1.simetrica);
    return { grafo1, grafo2 };
}

function dir_boolean(){

}