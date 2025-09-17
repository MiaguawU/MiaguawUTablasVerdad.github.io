export function DesConvertir(tabla) {//validado
    //el array debe ser array, 
    if (!Array.isArray(tabla)) {
        console.error("la tabla no es array", tabla);
        return [];
    }

    //si es simple lo hacemos bidimensibal
    if (!Array.isArray(tabla[0])) {
        tabla = [tabla];
    }

    return tabla.map(fila => 
        fila.map(celda => {
            if (celda === 0) return "V";//vamos colovando el nuevo valor a esa celdda
            if (celda === 1) return "F";

            if (typeof celda === "string") {
                return celda
                    .replace(/NOT/g, "¬")
                    .replace(/AND/g, "∧")
                    .replace(/OR/g, "v")
                    .replace(/THEN/g, "→")
                    .replace(/IF/g, "↔");
            }

            return celda;
        })
    );
}