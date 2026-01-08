import { getColor, limites_lineas,autoLayout,gen_colores,getPoint } from "./logica.js";
const svgNS = "http://www.w3.org/2000/svg";

export function crearRef(valorInicial = null) {
  return { current: valorInicial };
}

export async function init_svg(id,vars,mapa,config) {
    let svgElement;

    if (typeof id === 'string') {
        svgElement = document.getElementById(id);
    } else if (id instanceof SVGSVGElement) {
        svgElement = id;
    }

    if (!svgElement) throw new Error(`SVG no encontrado: ${id}`);

    svgElement.innerHTML = ''; 

    autoLayout(mapa,config); 
    config.limites = limites_lineas(vars, mapa); 
    gen_colores(vars, mapa,config);

    return crearRef(svgElement);
}

//eklemntos visuales

function createSVGElement(tag, attrs) {
    const el = document.createElementNS(svgNS, tag);
    for (let k in attrs) el.setAttribute(k, attrs[k]);
    return el;
}

export function gen_inputs(variables,config) {
    let limitesY=config.limites ||{};
    variables.forEach((v, i) => {
        const xNormal = config.busX + (i * config.busSpacing * 2.5);
        const xNot = xNormal + config.busSpacing;
        const yTop = 40;
        
        config.svg.current.appendChild(createSVGElement("line", { x1: xNormal, y1: yTop, x2: xNormal, y2: limitesY[v], stroke: getColor(v,config), "stroke-width": config.strokeWidth, class: "wire" }));
        config.connectionPoints[v] = { x: xNormal };
        
        const label = createSVGElement("text", { x: xNormal - 5, y: yTop - 10, class: "text-label", fill: getColor(v,config) });
        label.textContent = v;
        config.svg.current.appendChild(label);

        if (limitesY[v + "'"] > 80) {
            const yNot = yTop + 30;
            const colorNormal = getColor(v, config);
            const colorNot = getColor(v + "'", config); 

            config.svg.current.appendChild(createSVGElement("circle", { cx: xNormal, cy: yNot, r: 4, fill: colorNormal }));
            
            config.svg.current.appendChild(createSVGElement("line", { 
                x1: xNormal, y1: yNot, x2: xNot - 22, y2: yNot, 
                stroke: colorNormal, "stroke-width": config.strokeWidth, class: "wire" 
            }));
            
            config.svg.current.appendChild(createSVGElement("polygon", {
                points: `${xNot-22},${yNot-10} ${xNot-22},${yNot+10} ${xNot-7},${yNot}`,
                fill: "white", stroke: colorNormal, "stroke-width": 2
            }));
            
            config.svg.current.appendChild(createSVGElement("circle", { 
                cx: xNot - 4, cy: yNot, r: 3.5, fill: "white", stroke: colorNormal, "stroke-width": 2 
            }));

            config.svg.current.appendChild(createSVGElement("line", { 
                x1: xNot, y1: yNot, x2: xNot, y2: limitesY[v + "'"], 
                stroke: colorNot, "stroke-width": config.strokeWidth, class: "wire" 
            }));
            
            config.connectionPoints[v + "'"] = { x: xNot };
        }
    });
}

export function gen_AND(esFinal, comp, id, config) {
    let inputCount=comp.inputs.length;
    let y= comp.posY;
    let x= esFinal ? config.orColumnX : config.gateColumnX;
    const color = getColor(id,config);
    const pathData = `M ${x} ${y} L ${x+40} ${y} Q ${x+60} ${y+25} ${x+40} ${y+50} L ${x} ${y+50} Z`;
    config.svg.current.appendChild(createSVGElement("path", { d: pathData, class: "gate", stroke: color, "stroke-width": config.strokeWidth }));
    config.connectionPoints[id] = { x: x + 55, y: y + 25 }; 
    return { inX: x, inYStart: y + 10, spacing: 30 / (inputCount - 1 || 1) };
}

export function gen_OR(esFinal, comp, id, config) {
    let inputCount=comp.inputs.length;
    let y= comp.posY;
    let x= esFinal ? config.orColumnX : config.gateColumnX;
    const color = getColor(id,config);
    const spacing = inputCount > 5 ? 20 : 30;
    const height = Math.max(50, (inputCount - 1) * spacing + 40);
    const midY = height / 2;
    const width = 70;
    const pathData = `M ${x} ${y} Q ${x + 20} ${y + midY} ${x} ${y + height} Q ${x + width * 0.7} ${y + height} ${x + width} ${y + midY} Q ${x + width * 0.7} ${y} ${x} ${y} Z`;
    config.svg.current.appendChild(createSVGElement("path", { d: pathData, class: "gate", stroke: color, "stroke-width": config.strokeWidth }));
    config.connectionPoints[id] = { x: x + width, y: y + midY };
    return { inX: x, inYStart: y + 20, spacing: spacing };
}

export function conectar(fromId, esFinal, info, i,config) {
    let toX=esFinal ? config.orColumnX : config.gateColumnX;
    let toY=info.inYStart + (i * info.spacing);
    // Limpiamos el ID por si viene como OUT_AND_1
    const cleanId = fromId.replace("OUT_", "");
    const from = config.connectionPoints[cleanId] || config.connectionPoints[fromId];
    if (!from) return;
    
    const color = getColor(fromId,config);
    const startX = from.x;
    const startY = (from.y !== undefined) ? from.y : toY;
    
    if (from.y === undefined) config.svg.current.appendChild(createSVGElement("circle", { cx: startX, cy: startY, r: 4, fill: color }));
    
    const midX = startX + (toX - startX) * 0.5;
    const points = `${startX},${startY} ${midX},${startY} ${midX},${toY} ${toX},${toY}`;
    config.svg.current.appendChild(createSVGElement("polyline", { points: points, class: "wire", stroke: color, "stroke-width": config.strokeWidth }));
}

export function final(id, nombre_sal, config) {
    const color = getColor(id, config);
    // Usamos nuestra nueva función segura
    const pt = getPoint(id, config);

    config.svg.current.appendChild(createSVGElement("line", { 
        x1: pt.x, 
        y1: pt.y, 
        x2: pt.x + 50, 
        y2: pt.y, 
        stroke: color, 
        "stroke-width": config.strokeWidth, 
        class: "wire" 
    }));

    const label = createSVGElement("text", { 
        x: pt.x + 60, 
        y: pt.y + 5, 
        class: "output-label", 
        fill: color 
    });
    label.textContent = nombre_sal;
    config.svg.current.appendChild(label);
}