import { obtenerAngulo } from './logica.js';

export function add_eventos({ context, dimens }) {
  let dragging = false;
  let anguloInicial = 0;
  let rotacionActual = 0;

  const Asvg = context.svg.current;
  const Aroot = context.root.current;

  Asvg.addEventListener("mousedown", e => {
    e.preventDefault(); 
    dragging = true;
    Asvg.classList.add("dragging");
    anguloInicial = obtenerAngulo(e, dimens.cx, dimens.cy) - rotacionActual;
  });

  Asvg.addEventListener("mousemove", e => {
    if (!dragging) return;
    e.preventDefault(); 
    
    rotacionActual = obtenerAngulo(e, dimens.cx, dimens.cy) - anguloInicial;
    
    Aroot.setAttribute(
      "transform",
      `rotate(${rotacionActual} ${dimens.cx} ${dimens.cy})`
    );
  });

  const stopDragging = () => {
    dragging = false;
    Asvg.classList.remove("dragging");
  };

  Asvg.addEventListener("mouseup", stopDragging);
  Asvg.addEventListener("mouseleave", stopDragging);
}

//otros eventos
export function toggleGrupoColor(grupo) {
  const activo = grupo.getAttribute("data-activo") === "1";
  grupo.setAttribute("data-activo", activo ? "0" : "1");

  grupo.querySelectorAll("*").forEach(el => {
    if (el.hasAttribute("stroke"))
      el.setAttribute("stroke", activo ? "black" : "rgb(207 0 69)");
    if (el.tagName === "text")
      el.setAttribute("fill", activo ? "black" : "rgb(207 0 69)");
  });
}

export function resaltar_conex(nodoIndex, current) {
    const root = current.context.root.current;
    
    const relaciones = root.querySelectorAll('.relacion-linea');
    const nodos = root.querySelectorAll('g[data-nodo], circle[data-nodo-punto]');

    const esMismoNodo = root.getAttribute("data-foco-activo") === String(nodoIndex);
    
    if (esMismoNodo) {
        relaciones.forEach(r => {
            r.style.opacity = "1";
            r.style.strokeWidth = "2"; 
        });
        nodos.forEach(n => n.style.opacity = "1");
        root.removeAttribute("data-foco-activo");
        return;
    }

    root.setAttribute("data-foco-activo", nodoIndex);

    //identificar los nodos relacionados
    const nodosConectados = new Set();
    nodosConectados.add(String(nodoIndex)); 

    relaciones.forEach(rel => {
        const from = rel.getAttribute("data-from");
        const to = rel.getAttribute("data-to");
        
        if (from === String(nodoIndex)) nodosConectados.add(to);
        if (to === String(nodoIndex)) nodosConectados.add(from);
    });

    relaciones.forEach(rel => {
        const esConexionDirecta = rel.getAttribute("data-from") === String(nodoIndex) || 
                                  rel.getAttribute("data-to") === String(nodoIndex);
        
        rel.style.opacity = esConexionDirecta ? "1" : "0.8"; 
        rel.style.strokeWidth = esConexionDirecta ? "3" : "1";
    });

    nodos.forEach(nodo => {
        const seleccionado = nodo.getAttribute("data-nodo")===String(nodoIndex);
        
        nodo.style.opacity = seleccionado ? "1" : "0.6";
    });
}