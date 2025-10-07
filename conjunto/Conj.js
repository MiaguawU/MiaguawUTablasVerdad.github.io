let universo = [];
let vocales =[];
let conjA =[" "];
let conjB =[" "];
let conjC =[];
let n= 0;

function complemento(con){
    const conj = Array.isArray(con) ? [...con] : ["null"];
    let conjRes = [...universo];
    if(conj===null){
        throw new Error("El conjunto no es un array");
    }
    
    if(conj.length===0){
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

    if(izquierda=== null|| derecha ===null){
        console.log(izquierda)
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
        return resultado;
    }
    resultado = resultado.filter(e => e !== " ");
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
    console.log("res de ult");
    console.log(conjsRes.ter);

    alert("exito");

    return conjsRes;
}

export function validar(num,un,voc,A,B,C){
    let resultados;
    universo = Array.isArray(un) ? [...un] : ["null"];

    if(num===""){
        n = 27;
    }
    else{
        n = parseInt(num);
    }
    if(A===""){
        console.log("A es nada");
        console.log(A);
    }
    else{
        conjA = A.split("");
        if (/\s/.test(A)) {
            alert("A no puede tener espacios");
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
    }
    console.log("Valor de B:", B, "tipo:", typeof B);
    if(B.trim()===""){
        console.log("B es nada");
        console.log(B);
    }
    else{
        conjB = B.split("");
        if (/\s/.test(B)) {
            alert("B no puede tener espacios");
            return false;
        }
            
        for(let i=0; i<conjB.length; i++){
            if(!universo.includes(conjB[i].toLowerCase())){
                alert(conjB[i]+" no estta en el universo, revisa B");
                return false;
            }
        }
    }
    console.log(C);
    if(C===""){
        console.log("C es nada");
        conjC = Array.isArray(voc) ? [...voc] : ["null"];
        vocales= Array.isArray(voc) ? [...voc] : ["null"];
        console.log(C);
        if (/\s/.test(C)) {
            alert("C no puede tener espacios");
            return false;
        }
        for(let i=0; i<conjC.length; i++){
            if(!vocales.includes(conjC[i].toLowerCase())){
                alert(conjC[i]+" no estta en el universo o no es una vocal, revisa C");
                return false;
            }
        }
    }
    else{
        conjC = C.split("");
        vocales= Array.isArray(voc) ? [...voc] : ["null"];
    }

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

    if(universo===null||vocales===null||conjC===null){
        alert("Error inesperado");
        return false;
    }

    conjA = [...new Set(conjA)];//quita duplicados
    conjB = [...new Set(conjB)];//quita duplicados
    conjC = [...new Set(conjC)];//quita duplicados
    console.log(conjB)

    resultados={...operacionesDef()};

    return resultados;
}