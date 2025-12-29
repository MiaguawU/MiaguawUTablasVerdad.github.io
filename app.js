import { agregarParentesis } from "./funciones/AgregarParentesis.js";
import { Convertir } from "./funciones/Convertir.js";
import { DesConvertir } from "./funciones/DesConvertir.js";
import { SinParentesisArrayConOperadores } from "./funciones/SinParentesis.js";
import { UltimaColumnaEnResolver } from "./funciones/UltimaColumnaEnResolver.js";
import { MandarAResolverSoloC } from "./funciones/MandarResolver.js";
import { GenerarColumnas,GenerarColumnasDeTabla } from "./funciones/GenerarColm.js";
import { Resolver } from "./funciones/Resolver.js";

function OrdenEspecial(arrTemp){//validado
    const array = Array.isArray(arrTemp) ? [...arrTemp] : ["null"];
    
    const abc = [
        "a","b","c","d","e","f","g","h","i","j","k","l","m",
        "n","o","p","q","r","s","t","u","w","x","y","z"
    ];
    const operadores = ["NOT","AND", "OR", "THEN", "IF"];
    let orden = new Array(array.length).fill(0);
    let contOrden =0;

    for(let i=0; i<operadores.length;i++){
        if(array[0]==="null"){
            throw new Error("el array es invalido")
        }
            for(let j =0; j<orden.length;j++){
                let aStr = String(array[j]);
                if(orden[j]!==0)continue;

                if(aStr.length===1&&abc.includes(aStr.toLowerCase())){
                    orden[j]=-1;
                }else{
                    if(array[j]===operadores[i]){
                        contOrden++;
                        orden[j]=contOrden;
                    }
                } 
                
            }
                 
    }
    return orden;
}

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
    let ap,ap4=0;
        
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
                console.log("paso a columna especial")
                let arrOrden = OrdenEspecial(arrTemp);//sacamos el orden de resolucion
                let expresion=agregarParentesis(arrTemp,arrOrden);//agregar parentesis para un mejor orden
                //mandamos a resolver las columnas y el reultado lo ponemos en esta (eso lo hago cuando termine este while)
                columnaEspecial=[...MandarAResolverSoloC(expresion,n,pp,null,1)];
                console.log("colm resuleta res")
                console.log(columnaEspecial)
            }
        }
        
    }

    let tabla = [...MandarAResolverSoloC(arrbs,n,pp,columnaEspecial,0)];
    tabla = [...DesConvertir(tabla)];
    return tabla;

}

export function EsTautologia (resUno, resDos, resTres, resCuatro, resCinco){
    const pp = ["p","q","r","s","t"];
    const n = 5;
    let tabla = [["uno"],["dos"],["tres"],["cuatro"],["cinco"],["=c"]];

    let expresiones = {//diccionario de los arrays (objeto)
        uno: [...Convertir(resUno.split(""))],
        dos: [...Convertir(resDos.split(""))],
        tres: [...Convertir(resTres.split(""))],
        cuatro: [...Convertir(resCuatro.split(""))],
        cinco: [...Convertir(resCinco.split(""))]
    };

    for (let i = 0; i < tabla.length-1; i++) {
        let nombre = tabla[i][0];  
        tabla[i] = [...MandarAResolverSoloC(expresiones[nombre],n,pp,null,1)];
        tabla[i][0]=nombre;
    }

    tabla[1]=[...Resolver("AND",tabla[0],tabla[1],32,"dos")];
    tabla[2]=[...Resolver("AND",tabla[1],tabla[2],32,"tres")];
    tabla[3]=[...Resolver("AND",tabla[2],tabla[3],32,"cuatro")];

    tabla[5]=[...Resolver("THEN",tabla[3],tabla[4],32,"=c")];
    console.log(tabla[5])

    for (let i = 1; i < 32; i++) {
        if(tabla[5][i]===1){
            console.log("antes de mayonesa: "+tabla[5][i])
            return false;
        }
    }
    console.log("tabla resuelta mayonesa: ")
    console.log(tabla);

    return true;
}

export function ValidarC(expre,tautologia) {
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

    if(tautologia===0){
        return true;
    }

    alert("exito: " + prOr);
    let tabla = [...Generar(prOr)];
    return tabla;
}