export function VerifSiEstaLlenoLasigColmsinfilas(arr, colm, empzo, anterior) {//validado
    let comienza = colm - empzo;
    let ap = anterior === 0 ? comienza + 1 : comienza - 1;

    if (ap < 0 || ap >= arr.length) {
        return false;
    }

    return arr[ap] !== 0;
}
