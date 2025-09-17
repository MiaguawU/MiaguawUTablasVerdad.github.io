import { agregarParentesis } from "./funciones/AgregarParentesis.js";
import { Convertir } from "./funciones/Convertir.js";
import { DesConvertir } from "./funciones/DesConvertir.js";
import { SinParentesisArrayConOperadores } from "./funciones/SinParentesis.js";
import { UltimaColumnaEnResolver } from "./funciones/UltimaColumnaEnResolver.js";
import { MandarAResolverSoloC } from "./funciones/MandarResolver.js";
import { GenerarColumnasDeTabla } from "./funciones/GenerarColm.js";

function Generar(expresion) {
    const original = expresion;
    const arrOrg = original.split("");
    const arrbs = Convertir(arrOrg);

    let n = 0; //numero de prep primnitvas
    let pp = [];
    const abc = [
        "a","b","c","d","e","f","g","h","i","j","k","l","m",
        "n","o","p","q","r","s","t","u","w","x","y","z"
    ];

    for (let i = 0; i < arrbs.length; i++) {
        let bslower = (arrbs[i] ?? "").toLowerCase();
        if (abc.includes(bslower) && !pp.includes(bslower)) {
            n++;
            pp.push(bslower);
        }
    }
    console.log(arrbs);
    console.log(pp)
    let colmOrg =[...GenerarColumnasDeTabla(arrbs,n,pp)];
    let columnaEspecial =[];
    let {ap,ap4}=0
        
    for (let i=0; i< colmOrg.length; i++){
        ap= i+1;
        ap4=i-1;
        if((colmOrg[i][0].match(/[()]/g) || []).length >= 2){//contamos cuantos parentesis hay, si hay mas de 2 ...
            //primero ver cuales pp hay
            let contpp=0;
            let arrTemp = [...SinParentesisArrayConOperadores(colmOrg[i][0])];// [""p", "AND", "g"] ejemplo
            let arrT2=[];
            for(let j=0; j<arrTemp.length; j++){
                if(arrTemp[j].length === 1 && abc.includes(arrTemp[j].toLowerCase())){
                    contpp++;
                }
            }
            //si hay mas de 2 pp, 
            if(contpp>2){
                let arrOrden = UltimaColumnaEnResolver(arrTemp,0,arrT2.length-1,0);//sacamos el orden de resolucion
                let expresion=agregarParentesis(arrTemp,arrOrden);//agregar parentesis para un mejor orden
                arrT2=SinParentesisArrayConOperadores(expresion,0);//crearmos columnas
                //mandamos a resolver las columnas y el reultado lo ponemos en esta (eso lo hago cuando termine este while)
                columnaEspecial=[...MandarAResolverSoloC(arrT2,n,pp,null,1)];
            }
        }
        
    }

    let tabla = [...MandarAResolverSoloC(arrbs,n,pp,columnaEspecial,0)];
    tabla = [...DesConvertir(tabla)];
    return tabla;

}

export function ValidarC(expre) {
    let prOr = "";

    if (expre !== undefined) {
        prOr = expre;
        console.log("Expresion recibida de A o B:", prOr);
    } else {
        const origElement = document.getElementById("orig");
        if (!origElement) {
            alert("No se encontro el input 'orig' para leer la proposicion.");
            return false;
        }
        prOr = origElement.value;
    }

    if (/\d/.test(prOr)) {
        alert("Hay numeros, no se puede generar la tabla");
        return false;
    }

    const simbP = /^[¬∧→↔()a-zA-Z]+$/;
    if (!simbP.test(prOr)) {
        alert("Hay simbolos no permitidos. Solo se aceptan ¬∧→↔()v y letras.");
        return false;
    }

    if (prOr === "") {
        alert("Por favor, introduzca una proposicion.");
        return false;
    }
    
    const arrP = Convertir(prOr.split(""));
    
    const abc = "abcdefghijklmnopqrstuvwxyz".split("");

    let contP = 0;
    let contO = 0;

    for (let i = 0; i < arrP.length; i++) {
        let ap1 = i + 1;
        let ap2 = i - 1;

        if (arrP[i] === "(" || arrP[i] === ")") contP++;

        if (arrP[i] === "NOT") {
            if (["OR", "NOT", "AND", "THEN", "IF"].includes(arrP[ap1])) {
                alert("No puede haber una negacion seguida de un operador.");
                return false;
            }
            if (arrP[ap2] === ")") {
                alert("No puede haber una negacion despues de un parentesis cerrado.");
                return false;
            }
        }

        if (["OR", "AND", "THEN", "IF"].includes(arrP[i])) {
            if (["OR", "AND", "THEN", "IF", ")"].includes(arrP[ap1])) {
                alert(`No pueden estar dos operadores juntos: ${arrP[i]}${arrP[ap1]}`);
                return false;
            }
            if (arrP[ap2] === "(") {
                alert(`No puede haber un parentesis antes del operador: ${arrP[i]}`);
                return false;
            }
            contO++;
        }

        if (abc.includes(arrP[i].toLowerCase()) &&
            (abc.includes(arrP[ap1]?.toLowerCase()) || arrP[ap1] === "(")) {
            alert(`No puedes escribir ${arrP[i]}${arrP[ap1]} juntos.`);
            return false;
        }
    }

    if (contP % 2 !== 0) {
        alert("Hay parentesis sin cerrar.");
        return false;
    }

    if (contO <= 0) {
        alert("No hay operaciones, no es una proposicion compuesta.");
        return false;
    }

    alert("exito: " + prOr);
    let tabla = [...Generar(prOr)];
    return tabla;
}