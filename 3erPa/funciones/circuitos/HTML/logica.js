//solo los limites no necesitan ni necesitaran config
export function limites_lineas(variables, mapa) {
    const limites = {};

    const varsArray = Array.isArray(variables) ? variables : Array.from(variables || []);
    
    if (varsArray.length === 0) {
        console.warn("limites_lineas: La lista de variables está vacía.");
    }

    varsArray.forEach(v => { 
        limites[v] = 80; 
        limites[v + "'"] = 80; 
    });

    Object.values(mapa).forEach(comp => {
        comp.inputs.forEach((input, i) => {
            if (limites[input] !== undefined) {
                let offset = (comp.tipo === "AND") ? 10 + (i * (30 / (comp.inputs.length - 1 || 1))) : 20 + (i * (comp.inputs.length > 5 ? 20 : 30));
                limites[input] = Math.max(limites[input], comp.posY + offset);
            }
        });
    });
    return limites;
}
//
export function autoLayout(mapa,config) {
    let currentY = 100;
    const keys = Object.keys(mapa).filter(k => 
        mapa[k] !== null && 
        typeof mapa[k] === 'object' && 
        mapa[k].tipo 
    );
    
    const gatesInternas = keys.filter(k => !mapa[k].esFinal);
    const gateFinal = keys.find(k => mapa[k].esFinal);

    gatesInternas.forEach(id => {
        mapa[id].posY = currentY;
        currentY += config.verticalGap;
    });

    if (gateFinal) {
        const sumY = gatesInternas.reduce((acc, id) => acc + mapa[id].posY, 0);
        mapa[gateFinal].posY = sumY / gatesInternas.length;
    }
}

export function gen_colores(variables, mapaLogico, config) {
    variables.forEach((v, i) => {
        const hue = (i * (360 / variables.length)) % 360;
        config.colores[v] = `hsl(${hue}, 70%, 45%)`; 
        config.colores[v + "'"] = `hsl(${hue}, 45%, 55%)`; 
    });

    Object.keys(mapaLogico).forEach((id, i) => {
        const nombreID = id.trim();
        
        const luminosidad = Math.min(30 + (i * 5), 65); 
        
        config.colores[nombreID] = `hsl(210, 50%, ${luminosidad}%)`;
    });
}

export function getColor(id, config) {
    if (!id) return "#444";
    
    const llave = id.trim();
    if (config.colores && config.colores[llave]) {
        return config.colores[llave];
    } else {
        console.error(`ERROR: La llave "${llave}" no existe en config.colores. Disponibles:`, Object.keys(config.colores));
    }
    return "#444";
}

export function getPoint(id, config) {
    const pt = config.connectionPoints[id];
    console.log(config)
    if (pt && pt.x !== undefined && pt.y !== undefined) {
        return pt;
    }
    console.warn(`Punto de conexión no encontrado para: ${id}`);
    return { x: 0, y: 0 }; 
}