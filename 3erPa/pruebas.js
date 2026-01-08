// Función auxiliar para que el ejemplo funcione
function a_base_10(binario, base) {
    return parseInt(binario.toString(), base);
}

// Tu función original ajustada para ser ejecutable
function gen_tabla(lista) {
    let tabla = [];
    let num_base10 = [];
    let n = 5; // Reducido a 3 para el ejemplo, pero funciona con 5
    let filas = Math.pow(2, n);
    let columnas = n + 1;

    for (let i = 1; i <= n; i++) tabla.push([`x${i}`]);
    tabla.push(["resultado"]);

    for (let j = 0; j < n; j++) {
        let bloq = Math.pow(2, n - 1 - j);
        for (let k = 0; k < filas; k++) {
            let valor = Math.floor(k / bloq) % 2 === 0 ? 0 : 1; // Ajustado a lógica estándar
            tabla[j].push(valor);
        }
    }

    for (let i = 1; i <= filas; i++) {
        let binStr = "";
        for (let j = 0; j < n; j++) binStr += tabla[j][i];
        num_base10.push(a_base_10(binStr, 2));
    }

    // Llenar columna de resultados (índice n)
    for (let i = 1; i <= filas; i++) {
        let valorDecimal = num_base10[i - 1];
        tabla[n].push(lista.includes(valorDecimal) ? 1 : 0);
    }

    return tabla;
}

/**
 * ESTA ES LA FUNCIÓN QUE BUSCAS:
 * Convierte tu estructura de columnas a FNC
 */
function obtenerFNCDesdeColumnas(tabla) {
    const n = tabla.length - 1; // Número de variables
    const numFilas = tabla[0].length;
    let maxterms = [];

    // Recorremos las filas (empezando en 1 por el encabezado)
    for (let i = 1; i < numFilas; i++) {
        // Buscamos donde el resultado (última columna) sea 0
        if (tabla[n][i] === 0) {
            let terminos = [];
            for (let j = 0; j < n; j++) {
                let nombreVar = tabla[j][0];
                let valor = tabla[j][i];
                // En FNC: 0 -> normal, 1 -> negado
                terminos.push(valor === 0 ? nombreVar : `${nombreVar}'`);
            }
            maxterms.push(`(${terminos.join('+')})`);
        }
    }

    return maxterms.join(' · ');
}

function gen_FND(tabla){
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
            FND+="+";
            f_para_circ+="OR";
        }
    }
    return {FND,f_para_circ};
}

function analizarViabilidad(tabla) {
    const n = tabla.length - 1; // Índice de la columna de resultados
    const datosResultado = tabla[n].slice(1); // Quitamos el encabezado "resultado"
    
    const numUnos = datosResultado.filter(v => v === 1).length;
    const numCeros = datosResultado.filter(v => v === 0).length;
    const totalFilas = datosResultado.length;

    let recomendacion = "";
    if (numUnos < numCeros) {
        recomendacion = "FND (Forma Normal Disyuntiva)";
    } else if (numCeros < numUnos) {
        recomendacion = "FNC (Forma Normal Conjuntiva)";
    } else {
        recomendacion = "Cualquiera (ambas tienen la misma longitud)";
    }

    return {
        unos: numUnos,
        ceros: numCeros,
        total: totalFilas,
        recomendada: recomendacion,
        ahorro: Math.abs(numUnos - numCeros)
    };
}

// --- MODO DE USO ---
const miLista = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]; // Solo tres '1s' en una tabla de 32 filas (2^5)
const miTabla = gen_tabla(miLista);
const analisis = analizarViabilidad(miTabla);

console.log(`Análisis de la tabla:`);
console.log(`- Cantidad de 1s: ${analisis.unos}`);
console.log(`- Cantidad de 0s: ${analisis.ceros}`);
console.log(`- Opción más corta: ${analisis.recomendada}`);
console.log(`- Te ahorras escribir ${analisis.ahorro} términos.`);