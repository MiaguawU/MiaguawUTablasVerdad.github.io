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
    der=[...resolver([...conjB],[...conjC],"UNION")];
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

function normalizar(conjunto, nombre) {
    if (/[^A-Za-zñÑ,\[\]\(\)\{\}\s]/.test(conjunto)) {
    alert("Hay símbolos no válidos en: " + nombre);
    return false;
    }

    return conjunto
    .toLowerCase()
    .replace(/[\[\]\(\)\{\}\s,]/g, "") 
    .split("") 
    .filter(Boolean);
}


function existeEnUniverso(conjunto, nombre, vocals) {
    let un= [...universo];
    if(!conjunto){
        return false;
    }
    if(vocals){
        un=[...vocales];
    }
    let invalidos = conjunto.filter(el => !un.includes(el.toLowerCase()));

    if (invalidos.length) {
    alert(`Lo siguiente no es en el universo: ${invalidos.join(", ")} (en ${nombre})`);
    return false;
    }
    return true;
}

export function validar(num,un,voc,A,B,C){
    let resultados;
    universo = Array.isArray(un) ? [...un] : ["null"];
    vocales= Array.isArray(voc) ? [...voc] : ["null"];

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
    else if(A==="univ0"){
        conjA = [...universo];
    }
    else{
        conjA=[...normalizar(A,"A")];
        conjA = [...new Set(conjA)];
        let existe= existeEnUniverso(conjA,"A");

        if(!existe){
            return false;
        }
    }
    console.log("Valor de B:", B, "tipo:", typeof B);
    if(B===""){
        console.log("B es nada");
        console.log(B);
    }
    else if(B==="univ0"){
        conjB = [...universo];
    }
    else{
        conjB=[...normalizar(B,"B")];
        conjB = [...new Set(conjB)];
        let existe= existeEnUniverso(conjB,"B");

        if(!existe){
            return false;
        }
    }
    console.log(C);
    if(C===""){
        console.log("C es nada, vocales automaticas");
        conjC = Array.isArray(voc) ? [...voc] : ["null"];
        console.log(C);
    }
    else if(C==="univ0"){
        conjC = [...vocales];
    }
    else{
        conjC=[...normalizar(C,"C")];
        conjC = [...new Set(conjC)];
        let existe= existeEnUniverso(conjC,"C",true);
        if(!existe){
            return false;
        }
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

    console.log(conjB)

    resultados={...operacionesDef()};

    return resultados;
}