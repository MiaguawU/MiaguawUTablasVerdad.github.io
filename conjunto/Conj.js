let universo = [];
let vocales =[];
let conjA =[];
let conjB =[];
let conjC =[];
let n= 0;

function complemento(con){
    const conj = Array.isArray(con) ? [...con] : ["null"];
    let conjRes = [...universo];
    if(conj===null){
        throw new Error("El conjunto no es un array");
    }
    else if(conj.length===0){
        throw new Error("el conjunto es invalido");
    }

    if(conj[0]===" "){
        return conjRes;
    }
    else if(conj===universo){
        conjRes=[" "];
        return conjRes;
    }

    return conjRes.filter(elemento => !conj.includes(elemento));
}

function resolver(izq,der,op){
    const izquierda= Array.isArray(izq) ? [...izq] : ["null"];
    const derecha = Array.isArray(der) ? [...der] : ["null"];
    const operacion =String(op);
    let resultado=[];

    if(izquierda=== null|| derecha ===null || izquierda.length===0|| derecha.length===0){
        throw new Error("Algun conjunto dado no es valido");
    }

    if(operacion==="INTER"){
        resultado = izquierda.filter(elemento => derecha.includes(elemento));
    }
    else if(operacion==="UNION"){
        resultado = [...izquierda,...derecha];
    }
    else if(operacion==="MENOS"){
        resultado = izquierda.filter(elemento => !derecha.includes(elemento));
    }
    else if(operacion==="DIFF"){
        let nIzq = resolver(izquierda,derecha,"MENOS");
        let nDer = resolver(derecha,izquierda,"MENOS");
        resultado= resolver(nIzq,nDer,"UNION");
    }
    else{
        throw new Error("Solo usamos (INTER,UNION,MENOS,DIFF), tu pusiste: "+operacion);
    }
    
    resultado = [...new Set(resultado)];//quita duplicados
    resultado.sort((a, b) => a.localeCompare(b, "es"));//en español
    
    if(resultado.length===0||resultado===undefined){
        resultado=[" "];
    }
    return resultado;
}

function operacionesDef(){
    let izq;
    let der;

    let conjsRes = {
        pri: [],//[A,INTER,(B,UNION,C)]c
        seg: [],//A,INTER,(C,DIFF,B)
        ter: []//(Ac ⊕ Bc) ⊕ Cc 
    };

    console.log(conjC);
    //pri
    der=[...resolver([...conjC],[...conjB],"UNION")];
    console.log("derecha primera");
    console.log(der);
    izq=[...conjA];
    conjsRes.pri= complemento([...resolver(izq,der,"INTER")]);
    //seg
    der=[...resolver([...conjB],[...conjC],"DIFF")];
    izq=[...conjA];
    conjsRes.seg=[...resolver(izq,der,"INTER")];
    //ter
    izq=[...resolver([...complemento([...conjA])],[...complemento([...conjB])],"DIFF")];
    der=[...complemento([...conjC])];
    conjsRes.ter=[...resolver(izq,der,"DIFF")];

    alert("exito");

    return conjsRes;
}

export function validar(num,un,voc,A,B,C){
    let resultados;

    if(num===""){
        alert("n debe tener algun valor");
        return false;
    }
    if(A===""){
        alert("A debe contener alguna letra");
        return false;
    }
    if(B===""){
        alert("B debe contener alguna letra");
        return false;
    }

    if(C===""){
        conjC = Array.isArray(voc) ? [...voc] : ["null"];
        vocales= Array.isArray(voc) ? [...voc] : ["null"];
        if (/\s/.test(C)) {
            alert("C no puede tener espacios");
            return false;
        }
    }
    else{
        conjC = C.split("");
        vocales= Array.isArray(voc) ? [...voc] : ["null"];
    }

    n = parseInt(num);

    if(isNaN(n)){
        alert("n no es un numero");
        return false;
    }
    else if(n<=0){
        alert("n no puede ser menor o igual a cero");
        return false;
    }
    else if(n>27){
        alert("n no puede ser mayor a 27");
        return false;
    }

    if (/\s/.test(A)) {
        alert("A no puede tener espacios");
        return false;
    }
    if (/\s/.test(B)) {
        alert("B no puede tener espacios");
        return false;
    }

    universo = Array.isArray(un) ? [...un] : ["null"];
    conjA = A.split("");
    conjB = B.split("");

    if(universo===null||vocales===null||conjC===null){
        alert("Error inesperado");
        return false;
    }

    for(let i=0; i<conjA.length; i++){
        if(!universo.includes(conjA[i].toLowerCase())){
            alert(conjA[i]+" no estta en el universo, revisa A");
            return false;
        }
        for(let j=0;j<conjA.length; j++){
            if(conjA[i]===conjA[j] && i!==j){
                alert(conjA[i]+" se repite en A");
                return false;
            }
        }
    }
    for(let i=0; i<conjB.length; i++){
        if(!universo.includes(conjB[i].toLowerCase())){
            alert(conjB[i]+" no estta en el universo, revisa B");
            return false;
        }
        for(let j=0;j<conjB.length; j++){
            if(conjB[i]===conjB[j] && i!==j){
                alert(conjB[i]+" se repite en A");
                return false;
            }
        }
    }
    for(let i=0; i<conjC.length; i++){
        if(!vocales.includes(conjC[i].toLowerCase())){
            alert(conjC[i]+" no estta en el universo o no es una vocal, revisa C");
            return false;
        }
        for(let j=0;j<conjC.length; j++){
            if(conjC[i]===conjC[j] && i!==j){
                alert(conjC[i]+" se repite en C");
                return false;
            }
        }
    }

    resultados={...operacionesDef()};

    return resultados;
}