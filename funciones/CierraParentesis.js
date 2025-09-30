export function DondeCierraParentesis(colmEmpieza, arraycolm) {
    const colmOrg = arraycolm;
    if (!Array.isArray(colmOrg) || colmOrg.length === 0) return null;

    // Funcion auxiliar para obtener el valor (ya sea 2D o 1D)
    const getVal = (x) => Array.isArray(x) ? x[0] : x;

    let colm = String(getVal(colmOrg[colmEmpieza + 1]));
    const abreInicial = (colm.match(/\(/g) || []).length;
    if (abreInicial === 0) return null;

    let balance = 0;
    for (let j = colmEmpieza + 1; j < colmOrg.length; j++) {
        let col = String(getVal(colmOrg[j]));
        let cierra = (col.match(/\)/g) || []).length;

        balance = abreInicial - cierra;

        if (balance <= 0) {
            return j;
        }
    }

    return null;
}

export function ColumnaCierraParentesis(columna) {
    let colm = String(columna);
    let balance = 0;
    let tieneCierre = false;

    for (let j = 0; j < colm.length; j++) {
        let col = colm[j];
        if (col === "(") {
            balance++;
        }
        if (col === ")") {
            balance--;
            if (balance >= 0) {
                tieneCierre = true;
            }
        }
    }

    return tieneCierre;
}

export function DondeAbreParentesis(colmEmpieza, arraycolm) {
    const colmOrg = arraycolm;
    if (!Array.isArray(colmOrg) || colmOrg.length === 0) return null;

    const getVal = (x) => Array.isArray(x) ? x[0] : x;

    let colm = String(getVal(colmOrg[colmEmpieza - 1]));
    const cierraInicial = (colm.match(/\)/g) || []).length;
    if (cierraInicial === 0) return null;

    let balance = 0;
    for (let j = colmEmpieza - 1; j >= 0; j--) {
        let col = String(getVal(colmOrg[j]));
        let abre = (col.match(/\(/g) || []).length;

        balance = cierraInicial - abre;

        if (balance <= 0) {
            return j;
        }
    }

    return null;
}

export function CuantosParentCerrarHay(array,lugar){
    const arr = array;
    let lug= lugar;
    let contpar=0;
    let resultado=null;
    if (!Array.isArray(arr) || arr.length === 0) return null;
    //console.log(arr)

    for(let i=lug; i<arr.length; i++){
        //console.log("Vuelta: "+arr[i]);
        if(/\)/.test(arr[i])){
            if(i===lug){
                contpar++;
                //console.log("pasa 1 cuenta: "+contpar);
            }
            else if(i===(arr.length-1)){
                resultado = i;
                //console.log("no ):"+contpar)
                //console.log(arr[i])
                break;
            } 
            else{
                contpar++;
                //console.log("hay )): "+contpar)
            }
        }
        else{
            resultado = i-1;
            //console.log("no ):"+contpar)
            //console.log(arr[i-1])
            break;
        }       
    }

    return {resultado,contpar};
    
}