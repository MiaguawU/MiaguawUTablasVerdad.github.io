export function obtenerAngulo(e, cx, cy) {
  // el svg al que se clikeo
  const rect = e.currentTarget.getBoundingClientRect();
  
  //posicion del raton
  const mx = e.clientX - rect.left - cx;
  const my = e.clientY - rect.top - cy;
  
  return Math.atan2(my, mx) * 180 / Math.PI;
}

export function puntoPorIndice(i, radioExtra = 0,dimens) {
  const theta = (2 * Math.PI / dimens.puntos) * (i+90);
  return {
    x: dimens.cx + (dimens.r + radioExtra) * Math.cos(theta),
    y: dimens.cy + (dimens.r + radioExtra) * Math.sin(theta)
  };
}

export function obtener_color(i, total = 51) {
    const hue = (i * (360 / total)) % 360;
    return `hsl(${hue}, 70%, 45%)`;
}