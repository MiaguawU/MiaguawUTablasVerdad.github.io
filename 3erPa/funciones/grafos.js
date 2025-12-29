/*
primero generaremos la lista de numeros del 0 a n-1 donde n es el ingresado por el usuario
Ahora generaremos las relaciones con respecto a la relacion propuesta
utilizaremos true o false para saber si se ccumple o no las propiedades
*/

import{ gen_nodo, gen_lazo, gen_arista, gen_flecha } from './grafos/HTML/elements_Visuales.js';
import { init_svg } from './grafos/HTML/elements_Visuales.js';
import { Grafo } from './grafos/claseGrafo.js';
import { add_eventos } from './grafos/HTML/eventos.js';

let funciones={
  nodo:(i,current)=> gen_nodo(Number(i),current),
  lazo: (i,current) => gen_lazo(Number(i),current),
  arista:(i,j,current) =>gen_arista(Number(i),Number(j),current),
  flecha:(i,j,current) =>gen_flecha(Number(i),Number(j),current),
  iniciar: async (id) => await init_svg(id),
  fin:(current) =>add_eventos(current)
}

function gen_codominio(numero){//n por ejemplo 29 hace un arreglo del 0 al 28
    let cod = [];
    for(let i=0;i<numero;i++){
        cod.push(i);
    }
    return cod;
}

export async function gen_grafo(n,m,mount,rel){//principal
  console.log(`¿Existe ${rel} en global?:`, typeof globalThis[rel]);
  let cod = gen_codominio(n);
  let relacion=rel;

  if(rel.startsWith("rel_")){
    relacion = `${rel}(x, y, ${n}, ${m})`//rel_suma(n,m)
  }
  const grafo = new Grafo(relacion,cod,funciones,mount);
  grafo.vista();

  return {
        simetrica: grafo.Simetrica,
        reflexiva: grafo.Reflexiva,
        transitiva: grafo.Transitiva,
        antisimetrica: grafo.Antisimetrica
    };
}