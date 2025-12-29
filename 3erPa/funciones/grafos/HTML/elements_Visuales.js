import { puntoPorIndice,obtener_color } from './logica.js';//funciones
import { toggleGrupoColor,resaltar_conex } from './eventos.js';

const SVG_NS = "http://www.w3.org/2000/svg";

export function crearRef(valorInicial = null) {
  return { current: valorInicial };
}

export async function init_svg(id) {
    let svgElement;

    if (typeof id === 'string') {
        svgElement = document.getElementById(id);
    } else if (id instanceof SVGSVGElement) {
        svgElement = id;
    }

    if (!svgElement) throw new Error(`SVG no encontrado: ${id}`);

    svgElement.innerHTML = ''; 
    punta_flecha(svgElement);
    const markerId = `arrow-${id}`;
    
    const defs = document.createElementNS(SVG_NS, "defs");
    
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", markerId);
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "10");
    marker.setAttribute("refX", "8");
    marker.setAttribute("refY", "5");
    marker.setAttribute("orient", "auto");

    const arrowPath = document.createElementNS(SVG_NS, "path");
    arrowPath.setAttribute("d", "M0,0 L10,5 L0,10 Z");
    arrowPath.setAttribute("fill", "black");

    marker.appendChild(arrowPath);
    defs.appendChild(marker);
    svgElement.appendChild(defs);

    const rootElement = document.createElementNS(SVG_NS, "g");
    svgElement.appendChild(rootElement);

    return { 
        svg: crearRef(svgElement), 
        root: crearRef(rootElement), 
        markerId: markerId 
    };
}

//elementos principales visuales

//base, lo que siempre va
function gen_circulo(x, y, r) {
  const c = document.createElementNS(SVG_NS, "circle");
  c.setAttribute("cx", x);
  c.setAttribute("cy", y);
  c.setAttribute("r", r);
  c.setAttribute("fill", "black");
  return c;
}

export function gen_nodo(i,current){
    let cx=current.dimens.cx;
    let cy= current.dimens.cy;
    let r= current.dimens.r;
    let puntos=current.dimens.puntos;
    const color = obtener_color(i,puntos);

    const theta = (2 * Math.PI / puntos) * (i+90);
    const deg = theta * 180 / Math.PI;

    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);

    const punto = gen_circulo(x, y, 3);
    punto.setAttribute("fill", color);
    current.context.root.current.appendChild(punto);

    const grupo = document.createElementNS(SVG_NS, "g");
    grupo.setAttribute("transform", `translate(${x}, ${y}) rotate(${deg})`);
    grupo.setAttribute("data-nodo", i); // Etiqueta para identificar el nodo
    grupo.style.cursor = "pointer";

    //area de click (invisible)
    const hitbox = document.createElementNS(SVG_NS, "rect");
    hitbox.setAttribute("x", -5);
    hitbox.setAttribute("y", -25);
    hitbox.setAttribute("width", 50);
    hitbox.setAttribute("height", 50);
    hitbox.setAttribute("fill", "transparent");

    const grupoTexto = document.createElementNS(SVG_NS, "g");
    grupoTexto.setAttribute("transform", "translate(25, -11) rotate(90)");

    const textoBase = document.createElementNS(SVG_NS, "text");
    textoBase.setAttribute("x", 0);
    textoBase.setAttribute("y", 10);
    textoBase.setAttribute("font-size", "11");
    textoBase.setAttribute("font-family", "monospace");
    textoBase.textContent = `[${i}]`;

    const textoSub = document.createElementNS(SVG_NS, "text");
      if(i<10){
    textoSub.setAttribute("x", 19);
    }
    else{
    textoSub.setAttribute("x", 24);
    }
    textoSub.setAttribute("y", 14);
    textoSub.setAttribute("font-size", "8");
    textoSub.setAttribute("font-family", "monospace");
    textoSub.textContent = `${puntos}`;

    grupoTexto.appendChild(textoBase);
    grupoTexto.appendChild(textoSub);

    grupo.appendChild(hitbox);
    grupo.appendChild(grupoTexto);
    current.context.root.current.appendChild(grupo);

    grupo.addEventListener("click", (e) => {
        e.stopPropagation();
        resaltar_conex(i, current);
    });
    grupo.addEventListener("click", e => {
      e.stopPropagation();
      toggleGrupoColor(grupo);
    });
}
//los demas
export function gen_lazo(i,current) {
  const p = puntoPorIndice(i, 0,current.dimens);

  const rLazo = 6;   
  const offset = 4; //separacion del nodo

  //punto inicial y final (un poco distintos para que no se cierre el circlo)
  const x1 = p.x + offset ;
  const y1 = p.y - offset ;
  const x2 = p.x - offset ;
  const y2 = p.y - offset ;

  const path = document.createElementNS(SVG_NS, "path");

  // (↺)
  const d = `
    M ${x1} ${y1}
    A ${rLazo} ${rLazo} 0 1 1 ${x2} ${y2}
  `;

  path.setAttribute("d", d);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "blue");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("marker-end", "url(#arrow)");

  current.context.svg.current.appendChild(path);
  current.context.root.current.appendChild(path);
  return path;
}

export function gen_arista(i, j,current) {
  const p1 = puntoPorIndice(i, 0,current.dimens);
  const p2 = puntoPorIndice(j, 0,current.dimens);
  const color = obtener_color(i,current.dimens.puntos);

  const line = document.createElementNS(SVG_NS, "line");
  line.setAttribute("x1", p1.x);
  line.setAttribute("y1", p1.y);
  line.setAttribute("x2", p2.x);
  line.setAttribute("y2", p2.y);
  line.setAttribute("stroke", color);
  line.setAttribute("stroke-width", "2");

  line.setAttribute("class", "relacion-linea");
  line.setAttribute("data-from", i);
  line.setAttribute("data-to", j);
  line.setAttribute("marker-end", `url(#${current.context.markerId})`);

  if(current.context.root.current){
    current.context.root.current.appendChild(line);
  }

  return line;
}

export function gen_flecha(i, j,current) {
  const p1 = puntoPorIndice(i, 0,current.dimens);
  const p2 = puntoPorIndice(j, 0,current.dimens);
  const color = obtener_color(i,current.dimens.puntos);

  const line = document.createElementNS(SVG_NS, "line");
  line.setAttribute("x1", p1.x);
  line.setAttribute("y1", p1.y);
  line.setAttribute("x2", p2.x);
  line.setAttribute("y2", p2.y);
  line.setAttribute("stroke", color);
  line.setAttribute("stroke-width", "2");

  line.setAttribute("class", "relacion-linea");
  line.setAttribute("data-from", i);
  line.setAttribute("data-to", j);
  line.setAttribute("marker-end", "url(#arrow)");

  if(current.context.root.current){
    current.context.root.current.appendChild(line);
  }

  return line;
}

//complementos visuales
function punta_flecha(svg) {
  const defs = document.createElementNS(SVG_NS, "defs");

  const marker = document.createElementNS(SVG_NS, "marker");
  marker.setAttribute("id", "arrow");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "10");
  marker.setAttribute("refX", "9");
  marker.setAttribute("refY", "5");
  marker.setAttribute("orient", "auto");
  marker.setAttribute("markerUnits", "strokeWidth");

  const arrowPath = document.createElementNS(SVG_NS, "path");
  arrowPath.setAttribute("d", "M2,2 L10,5 L2,8");
  arrowPath.setAttribute("d", "M6,3 L9,5 L5,7");

  arrowPath.setAttribute("fill", "none");
  arrowPath.setAttribute("stroke", "purple");
  arrowPath.setAttribute("stroke-width", ".8");
  arrowPath.setAttribute("stroke-linecap", "round");
  arrowPath.setAttribute("stroke-linejoin", "round");

  marker.appendChild(arrowPath);
  defs.appendChild(marker);
  svg.appendChild(defs);
}