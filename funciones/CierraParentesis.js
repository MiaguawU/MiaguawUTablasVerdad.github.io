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