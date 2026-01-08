export function gen_FND(tabla){
    let FND="";
    let f_para_circ="";
    let n=5;
    let filas=2**n;
    let can_grupos=0;
    let colm_true=[];
    for(let i=1;i<filas+1;i++){
        if(tabla[n][i]){
            can_grupos++;
            colm_true.push(i);
        }
    }

    for(let i=0;i<can_grupos;i++){//fila
        let aux=0;
        aux=colm_true[i];
        for(let j=0;j<n;j++){//columnas
            if(tabla[j][aux]===1){
                f_para_circ+=`x${j+1}`;
                FND+=`x${j+1}`;
            }
            else{
                f_para_circ+=`NOTx${j+1}`;
                FND+=`x${j+1}'`;
            }
            if(i===n-1){
                f_para_circ+="AND";
            }
        }
        if(i!==can_grupos-1){
            FND+=" + ";
            f_para_circ+="OR";
        }
    }
    return FND;
}