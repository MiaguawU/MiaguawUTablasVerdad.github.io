import { DondeAbreParentesis, DondeCierraParentesis, ColumnaCierraParentesis } from "./CierraParentesis.js";
import { VerifSiEstaLlenoLasigColmsinfilas } from "./VerifEstaLlenoSigSiinFilas.js";
import { QueOperador } from "./QueOperador.js";

let arr =[];
arr.push(["p"]);
arr.push(["NOT"]);
arr.push(["((NOTp"]);
arr.push(["OR"]);
arr.push(["NOTq)"]);
arr.push(["AND"]);
arr.push(["(NOTp"]);
arr.push(["THENs))"]);
arr.push(["IF"]);
arr.push(["(sANDq)"]);
arr.push(["=c"])
//let res = UltimaColumnaEnResolver(arr,0,arr.length-1,0);
////console.log(res)

export function UltimaColumnaEnResolver (arraycolm,prcolm,ultcolm,orden){//
    const valor = [...arraycolm];
    const modoOrden=orden;
    let empezar=prcolm;
    let terminar=ultcolm;
    let vueltas=(terminar-empezar)+1;
    let contOrden=0;
    let arrayOrdenColm = new Array(vueltas).fill(0);
    let lleno = false;
    let cantColm=0;
    let {ap ,ap4}=0
    const abc = [
        "a","b","c","d","e","f","g","h","i","j","k","l","m",
        "n","o","p","q","r","s","t","u","w","x","y","z"
    ];
    //console.log("array mandado: ");
    //console.log(valor);
    while(!lleno){
        
        cantColm++;
        if (cantColm >= 200) {
            console.warn("⚠️ Se alcanzó el límite de 200 vueltas en UltimaColumnaEnResolver");
            lleno= true;
            break;
        }
        //console.log("vuelta: "+cantColm)

        for (let i = empezar; i <= terminar; i++) {
            const colmOrg = Array.isArray(valor[i]) ? valor[i][0] : valor[i];
            const colmStr = String(colmOrg);
            ap= i+1;
            ap4=i-1;
            if(arrayOrdenColm[i - empezar]!==0) continue;
            //console.log("Pasando... "+colmOrg);

            if (ColumnaCierraParentesis(colmOrg)===true) {//parentesiss primero
                contOrden++;
                arrayOrdenColm[i - empezar] = contOrden;
                //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
            }
            else if (colmOrg === "OR" || colmOrg === "NOT" || colmOrg === "AND" ||
                colmOrg === "THEN" || colmOrg === "IF") 
                {
                //console.log("Pasa segunda: "+colmOrg);
                //donde abre y cierra parentesis al rededor de la columna donde tamos
                let abreEn = DondeAbreParentesis(i, valor); 
                let cerradoEn = DondeCierraParentesis(i, valor);
                //console.log("columna: "+colmOrg+" columna izquierda con parenteiss: "+abreEn+" colm dercha "+cerradoEn)
                if(abreEn===ap4){//se hace null pq pues realmente solo ocupariamos esa colm y nos saltamos eso pero igual aqui hacemos el NOT 
                    abreEn = null;
                    //console.log("Abre en se cancela")
                }
                if(cerradoEn===ap){
                    if (((QueOperador(colmOrg))==="NOT") && (arrayOrdenColm[ap]!==0)) {
                        contOrden++;
                        arrayOrdenColm[i - empezar]=contOrden;
                        //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                        continue;
                    }
                    cerradoEn = null;
                    //console.log("Cerrado en se cancela")
                }
                if (cerradoEn !== null) {
                    let ultEnResDerecha = UltimaColumnaEnResolver(valor, i+1, cerradoEn);

                    if (arrayOrdenColm[ultEnResDerecha-empezar] !== 0 && (ultEnResDerecha-empezar)>=0) {
                        //revisar si hay NOT antes del parentesis
                        if ((QueOperador(colmOrg))==="NOT") {
                            contOrden++;
                            arrayOrdenColm[i - empezar]=contOrden;
                            //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                        } 
                        else if(abreEn !== null ){
                            let ultEnResIzq = UltimaColumnaEnResolver(valor, abreEn, i-1);
                            if(valor[abreEn-1][0]==="NOT"){
                                if(arrayOrdenColm[abreEn-1-empezar]!==0 && (abreEn-1-empezar)>=0){
                                    contOrden++;
                                    arrayOrdenColm[i - empezar]=contOrden;
                                    //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                                }
                            }
                            if (arrayOrdenColm[ultEnResIzq-empezar] !== 0 && (ultEnResIzq-empezar)>=0) {
                                contOrden++;
                                arrayOrdenColm[i - empezar]=contOrden;
                                //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                            }
                        }else {
                            //caso solo la derecha existe con parentesis
                            let colmIzq = i-1;
                            if(arrayOrdenColm[colmIzq-empezar]!==0 && (colmIzq-empezar)>=0){
                                contOrden++;
                                arrayOrdenColm[i - empezar]=contOrden;
                                //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                            }
                        }
                    }
                    
                } 
                else if(abreEn !== null){//si no tiene derecha con parentesis, pero izquierda si
                    let ultEnResIzq = UltimaColumnaEnResolver(valor, abreEn, i-1);
                    let colmDerec =i+1;
                    if(valor[abreEn-1][0]==="NOT"){
                        if(arrayOrdenColm[abreEn-1-empezar]!==0 && (abreEn-1-empezar)>=0){
                            contOrden++;
                            arrayOrdenColm[i - empezar]=contOrden;
                            //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                        }
                    }
                    else if(arrayOrdenColm[colmDerec-empezar]!==0 && arrayOrdenColm[ultEnResIzq-empezar]!==0 && (colmDerec-empezar)>=0 && (ultEnResIzq-empezar)>=0){
                        contOrden++;
                        arrayOrdenColm[i - empezar]=contOrden;
                        //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                    }
                }
                else if (arrayOrdenColm[ap-empezar] !== 0 && (ap-empezar)>=0) {//si en ningun al rededor hay parentesis cerrados podria ser (¬p
                    let colmDerec = i+1;
                    let colmIzq = i-1;
                    //console.log("Derecha es la derecha izq es la izq sin complicaciones")
                    if(arrayOrdenColm[colmDerec-empezar]!==0&& arrayOrdenColm[colmIzq-empezar]!==0 && (colmDerec-empezar)>=0&&(colmIzq-empezar)>=0){
                        contOrden++;
                            arrayOrdenColm[i - empezar]=contOrden;
                            //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                    }
                }
            }
            else if(/NOT/.test(colmOrg)){
                contOrden++;
                arrayOrdenColm[i - empezar] = contOrden; 
                //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
            }
            else if(colmStr.length === 1 && abc.includes(colmStr.toLowerCase())){
                arrayOrdenColm[i - empezar] = -1;
            }
            else if(colmOrg==="=c"){
                arrayOrdenColm[i - empezar] = -1;
            }
            else{
                let abreEn = DondeAbreParentesis(i, valor); 
                let cerradoEn = DondeCierraParentesis(i, valor);
                if(abreEn===ap4){//se hace null pq pues realmente solo ocupariamos esa colm y nos saltamos eso pero igual aqui hacemos el NOT 
                    abreEn = null;
                    //console.log("Abre en se cancela")
                }
                if(cerradoEn===ap){
                    cerradoEn = null;
                    //console.log("Cerrado en se cancela")
                }
                if(/^AND/.test(colmOrg)||/^OR/.test(colmOrg)||/^THEN/.test(colmOrg)
                    ||/^IF/.test(colmOrg)){//si estan al inicio
                    let estaLleno=VerifSiEstaLlenoLasigColmsinfilas(arrayOrdenColm,i,empezar,1);
                    if(abreEn !== null){//si hay parentesis
                        let ultEnResIzq = UltimaColumnaEnResolver(valor, abreEn, i-1);
                        if(valor[abreEn-1][0]==="NOT"){
                            if(arrayOrdenColm[abreEn-1-empezar]!==0&& (abreEn-1-empezar)>=0){
                                contOrden++;
                                arrayOrdenColm[i - empezar]=contOrden;
                                //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                            }
                        }
                        else if( arrayOrdenColm[ultEnResIzq-empezar]!==0 && (ultEnResIzq-empezar)>=0){
                            contOrden++;
                                arrayOrdenColm[i - empezar]=contOrden;
                                //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                        }
                    }
                    else if(estaLleno===true){
                        contOrden++;
                        arrayOrdenColm[i - empezar]=contOrden;
                        //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                    }
                }
                else if(/AND$/.test(colmOrg)||/OR$/.test(colmOrg)||/THEN$/.test(colmOrg)
                    ||/IF$/.test(colmOrg)){//si estan al final
                    let estaLleno=VerifSiEstaLlenoLasigColmsinfilas(arrayOrdenColm,i,empezar,0);
                    if (cerradoEn !== null) {
                        let ultEnResDerecha = UltimaColumnaEnResolver(valor, i+1, cerradoEn);

                        if (arrayOrdenColm[ultEnResDerecha-empezar] !== 0 && (ultEnResDerecha-empezar)>=0) {
                            contOrden++;
                            arrayOrdenColm[i - empezar]=contOrden;
                            //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                        }
                        
                    } 
                    else if(estaLleno===true){
                        contOrden++;
                        arrayOrdenColm[i - empezar]=contOrden;
                        //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                    }
                }
                else if(/AND/.test(colmOrg)||/OR/.test(colmOrg)||/THEN/.test(colmOrg)
                    ||/IF/.test(colmOrg)){
                    contOrden++;
                    arrayOrdenColm[i - empezar]=contOrden;
                    //console.log("Columna: "+colmOrg+" Orden: "+contOrden);
                }
                
            }
            
        }
        if (cantColm % 1000 === 0) {
    //console.log("Estado parcial:", arrayOrdenColm);
}

        lleno = arrayOrdenColm.every(x => x !== 0);
    }
    let mayor = arrayOrdenColm[0];
    let posicion = 0;
    for(let i=0; i<arrayOrdenColm.length; i++){
        if(arrayOrdenColm[i]>mayor){
            mayor = arrayOrdenColm[i];
            posicion = i+empezar;
        }
    }

    if(modoOrden===0){
        return arrayOrdenColm;
    }
    else{
        return posicion;
    }    
}