export function GenerarColumnas(arrPorProcesar,arrPorCompletar) {//valido
    let arrbs =[...arrPorProcesar];
    let colmOrg = Array.isArray(arrPorCompletar) ? [...arrPorCompletar] : [];
    let colmA = ""; //columna de apoyo
    const abc = [
        "a","b","c","d","e","f","g","h","i","j","k","l","m",
        "n","o","p","q","r","s","t","u","w","x","y","z"
    ];
    const operadores = ["AND", "OR", "NOT", "IF", "THEN"];
    let ap = 0;
    let hayAlgunOp=false;
    for (let i=0; i< arrbs.length; i++){
        colmA += arrbs[i];
        ap=i+1;
        if(arrbs[i]===")"){
            if(arrbs[ap]===")"){// y si hay parentesis infinitos?
                //nada para que se siga y podamos poner el otro parentesis en la columna
            }
            else{
                colmOrg.push([colmA]);
                colmA = "";
            }//si no ponemos else se hara una columna vacia
        }
        else if(arrbs[i]==="NOT"){
            if((i+1)<arrbs.length&&(arrbs[i+1]==="(")){
                colmOrg.push([colmA]);
                colmA = "";
            }
            else if((i-1)>=0&&(arrbs[i-1]==="OR"||arrbs[i-1]==="AND"||
                arrbs[i-1]==="THEN"||arrbs[i-1]==="IF")){
                    if(arrbs[1+i]!==undefined&&abc.includes(arrbs[i+1])){
                        if(arrbs[i+2]===")"){
                            
                        }
                        else{
                            hayAlgunOp=true
                        }
                    }
                    else{
                        colmOrg.push([colmA]);
                        colmA = "";
                    }
            }
        }
        else if(arrbs[i]==="OR"||arrbs[i]==="AND"||arrbs[i]==="THEN"||arrbs[i]==="IF"){
            if(arrbs[ap]==="("||arrbs[ap]==="NOT"){
                colmOrg.push([colmA]);
                colmA = "";
            }
        }
        else if (typeof arrbs[i] === "string" && abc.includes(arrbs[i].toLowerCase())&&!operadores.includes(arrbs[i].toUpperCase())) {
            if(i===arrbs.length-1){
                colmOrg.push([colmA]);
                colmA = "";
            }
            else if(arrbs[i+1]==="OR"||arrbs[i+1]==="AND"||arrbs[i+1]==="THEN"||arrbs[i+1]==="IF"||hayAlgunOp===true){
                if(arrbs[i-1]==="NOT"){
                    colmOrg.push([colmA]);
                    colmA = "";
                }
                
            }
        }
    }
    console.log("columnas hechas de generar: ")
    console.log(colmOrg);
    return colmOrg;
}

export function GenerarColumnasDeTabla(arrarSinColumnas,nn,pp) {
    let n = Number(nn);
    let ap=0;
    const abc = [
        "a","b","c","d","e","f","g","h","i","j","k","l","m",
        "n","o","p","q","r","s","t","u","w","x","y","z"
    ];
    let colmOrg =[];
    for (let i=0; i< n; i++){
        ap= i+1;
        if(i < n && pp[i] !== undefined){
            colmOrg.push([pp[i]]); //poner prep primi en primeras columnsa
        }
    }
    colmOrg = [...GenerarColumnas(arrarSinColumnas,colmOrg)];
    colmOrg.push(["=c"]);

    return colmOrg;
}