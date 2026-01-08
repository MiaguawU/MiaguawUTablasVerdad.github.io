import { a_base_10 } from "../../../2doPa/funciones/camBase.js"; 

export function gen_tabla(lista){
    let tabla=[];
    let num_base10=[];
    //son 5 x
    let n=5;
    let filas=2**n;
    //columnas
    let columnas=n+1;
    for(let i=1;i<columnas;i++){
        tabla.push([`x${i}`]);
    }
    tabla.push(["resultado"]);
    for (let j=0; j< n; j++){
        let bloq=2**(n-1-j);
        for (let k=0; k< filas; k++){
            let valor = Math.floor(k / bloq) % 2 === 0 ? 1 : 0;
            tabla[j].push(valor);
        }
    }
    
    for(let i=1;i<filas+1;i++){
        let aux=0;
        for(let j=0;j<n;j++){
            aux=aux*10 +tabla[j][i];
        }
        num_base10.push(aux);
    }
    /*for(let i=1;i<filas+1;i++){
        if(i>filas-4){
            tabla[n][i]=1;
            continue;
        }
        tabla[n][i]=0;
    }*/

    for(let i=0;i<num_base10.length;i++){
        //llamar para convertir a base 10 
        num_base10[i]= a_base_10(num_base10[i],2);
    }

    let agregado;
    for(let i=1;i<filas;i++){//resultados
        agregado=false;
        for(let j=0;j<lista.length;j++){
            if(Number(num_base10[i-1])===Number(lista[j])){
                tabla[n].push(1);
                agregado=true;
            }
            else if(!agregado){
                tabla[n].push(0);
                agregado=true;
            }
        }
    }
    console.log(num_base10)
    return tabla;
}