import { DondeAbreParentesis, DondeCierraParentesis, ColumnaCierraParentesis } from "./CierraParentesis.js";
import { GenerarColumnasDeTabla } from "./GenerarColm.js";
import { NumeroColumnaDePP } from "./NumeroPP.js";
import { QueOperador } from "./QueOperador.js";
import { Resolver } from "./Resolver.js";
import { SinParentesisArrayConOperadores } from "./SinParentesis.js";
import { UltimaColumnaEnResolver } from "./UltimaColumnaEnResolver.js";

export function MandarAResolverSoloC(arrarSinColumnas,nn,pp,colmEsp,tablaSi){//podria ser valido
    let n = Number(nn);
    let filas = 2**n;
    let termino = false;
    let ap4=0;
    let ap=0;
    let columnaEspecial = [];
    if(colmEsp!==undefined){
        columnaEspecial=colmEsp;
    }
    if(tablaSi===1){
        console.log("que mando el espc")
        console.log(arrarSinColumnas);
    }
    const abc = [
        "a","b","c","d","e","f","g","h","i","j","k","l","m",
        "n","o","p","q","r","s","t","u","w","x","y","z"
    ];
    let colmOrg =[...GenerarColumnasDeTabla(arrarSinColumnas,n,pp)];
    //console.log(colmOrg);
    let cantColm=0;

    while(!termino){
        cantColm++;
        if (cantColm >= 200) {
            console.warn("Limite 200 alcanzado");
            termino= true;
            break;
        }
        //console.log("vuelta resolviendo: "+cantColm)
        for (let i=0; i< colmOrg.length; i++){
            ap= i+1;
            ap4=i-1;
            if(colmOrg[i][1]!==undefined) continue;//si ya hay algo en esta columna pasamos a la otra
            
            if(colmOrg[i][0]===pp[i]){//columnas pp
                for (let j=i; j< n; j++){
                    let bloq=2**(n-1-j);//bloque es como el donde van a ser puros v o f
                    for (let k=0; k< filas; k++){
                        let valor = Math.floor(k / bloq) % 2 === 0 ? 1 : 0;//ej. 3/2 = 1.5 pero red hacia abajo 1/2 = 0.5 es es igual a 0? no entonces 1 osea F
                        //redondeamos hacia abajo y sacamos el residuo, si es 0 es verdad
                        colmOrg[j].push(valor);
                    }
                }
                ////console.log("se generaron pp en la tabla");
            }
            else if(ColumnaCierraParentesis(colmOrg[i][0])===true){//verificamos que esta columna cierre al menos un parne
                //primero ver cuales pp hay
                ////console.log("Pasa primera: "+colmOrg[i][0]);
                let contpp=0;
                let arrTemp = [...SinParentesisArrayConOperadores(colmOrg[i][0])];// [""p", "AND", "g"] ejemplo
                for(let j=0; j<arrTemp.length; j++){
                    if(arrTemp[j].length === 1 && abc.includes(arrTemp[j].toLowerCase())){
                        contpp++;
                    }
                }
                //si hay mas de 2 pp, eso pues ya lo hizo generar asi que lo ponemos
                if(contpp>2){
                    let guardar = colmOrg[i][0];
                    colmOrg[i]=[...columnaEspecial];
                    colmOrg[i][0]= guardar;//para que al final desconvierta T-T
                }
                else{
                    //resolver
                    let derec = [];
                    let izq = [];
                    let columna = NumeroColumnaDePP(colmOrg[i][0], pp);
                    // izquierda
                    if (columna.izquierda !== null && columna.izquierda >= 0 && Array.isArray(colmOrg[columna.izquierda])) {
                        izq = [...colmOrg[columna.izquierda]];
                    }
                    // derecha
                    if (columna.derecha !== null && columna.derecha >= 0 && Array.isArray(colmOrg[columna.derecha])) {
                        derec = [...colmOrg[columna.derecha]];
                    }
                    let op = columna.operador;
                    //resolvemos 
                    colmOrg[i]= [...Resolver(op,izq,derec,filas,colmOrg[i][0])];
                    ////console.log(colmOrg[i])
                }
            }
            else if (colmOrg[i][0] === "OR" || colmOrg[i][0] === "NOT" || colmOrg[i][0] === "AND" ||
                colmOrg[i][0] === "THEN" || colmOrg[i][0] === "IF") 
                {
                //console.log("Pasa segunda: "+colmOrg[i][0]);
                //donde abre y cierra parentesis al rededor de la columna donde tamos
                let abreEn = DondeAbreParentesis(i, colmOrg); 
                let cerradoEn = DondeCierraParentesis(i, colmOrg);
                //console.log("columna: "+colmOrg[i]+" columna izquierda con parenteiss: "+abreEn+" colm dercha "+cerradoEn)
                if(abreEn===ap4){//se hace null pq pues realmente solo ocupariamos esa colm y nos saltamos eso pero igual aqui hacemos el NOT 
                    abreEn = null;
                    //console.log("Abre en se cancela")
                }
                if(cerradoEn===ap){
                    if (((QueOperador(colmOrg[i][0]))==="NOT") && (colmOrg[ap][1]!==undefined)) {
                        colmOrg[i] = [...Resolver("NOT", null,colmOrg[ap], filas, "NOT")];
                        continue;
                    }
                    else{
                        ////console.log("cerradoEn: "+cerradoEn+" ap:"+ap)
                        cerradoEn = null;
                    }
                    //console.log("Cerrado en se cancela")
                }
                if (cerradoEn !== null) {
                    let ultEnResDerecha = UltimaColumnaEnResolver(colmOrg, i+1, cerradoEn);
                    //console.log("hay parentesis a la derecha: "+colmOrg[i][0])
                    if (colmOrg[ultEnResDerecha][1] !== undefined) {
                        //revisar si hay NOT antes del parentesis
                        //console.log("esta lleno parentesis derecha: "+colmOrg[i][0])
                        if ((QueOperador(colmOrg[i][0]))==="NOT") {
                            //resolver bloque y aplicar NOT
                            ////console.log("Resolviending ¬ pero con parentesis "+colmOrg[i][0])
                            ////console.log(colmOrg[ultEnResDerecha])
                            colmOrg[i] = [...Resolver("NOT", null,colmOrg[ultEnResDerecha], filas, "NOT")];
                        } 
                        else if(abreEn !== null ){
                            //console.log("hay parentesis a la izq: "+colmOrg[i][0])
                            let ultEnResIzq = UltimaColumnaEnResolver(colmOrg, abreEn, i-1,1);
                            //console.log("ult res izq: "+ultEnResIzq);
                            //console.log(colmOrg[ultEnResIzq])
                            if(colmOrg[abreEn-1][0]==="NOT"){
                                if(colmOrg[abreEn-1][1]!==undefined){
                                    //console.log("izquierda: "+colmOrg[abreEn-1])
                                    //console.log("derecha: "+colmOrg[ultEnResDerecha])
                                    colmOrg[i] = [...Resolver(op, colmOrg[abreEn-1],colmOrg[ultEnResDerecha], filas, colmOrg[i][0])];
                                }
                            }
                            else if (colmOrg[ultEnResIzq][1] !== undefined) {
                                //console.log("parentesisis izq lleno: "+colmOrg[i][0])
                                let op = QueOperador(colmOrg[i][0]);
                                ////console.log("izquierda: "+colmOrg[ultEnResIzq])
                                ////console.log("derecha: "+colmOrg[ultEnResDerecha])
                                colmOrg[i] = [...Resolver(op, colmOrg[ultEnResIzq],colmOrg[ultEnResDerecha], filas, colmOrg[i][0])];
                            }
                        }else {
                            //caso solo la derecha existe con parentesis
                            let colmIzq = i-1;
                            let op = QueOperador(colmOrg[i][0]);
                            if(colmOrg[colmIzq][1]!==undefined){
                                ////console.log("izquierda: "+colmOrg[colmIzq])
                                ////console.log("derecha: "+colmOrg[ultEnResDerecha])
                                colmOrg[i] = [...Resolver(op, colmOrg[colmIzq],colmOrg[ultEnResDerecha], filas, colmOrg[i][0])];
                            }
                        }
                    }
                    
                } 
                else if(abreEn !== null){//si no tiene derecha con parentesis, pero izquierda si
                    let ultEnResIzq = UltimaColumnaEnResolver(colmOrg, abreEn, i-1);
                    let colmDerec =i+1;
                    let op = QueOperador(colmOrg[i][0]);
                    //console.log("columna NOT antes del parentesis?: "+colmOrg[abreEn-1][0]);
                    if(colmOrg[abreEn-1][0]==="NOT"){
                        if(colmOrg[abreEn-1][1]!==undefined){
                            //console.log("izquierda: "+colmOrg[abreEn-1])
                            //console.log("derecha: "+colmOrg[colmDerec])
                            colmOrg[i] = [...Resolver(op, colmOrg[abreEn-1],colmOrg[colmDerec], filas, colmOrg[i][0])];
                        }
                    }
                    else if(colmOrg[colmDerec][1]!==undefined&& colmOrg[ultEnResIzq][1]!==undefined){
                        //console.log("izquierda: "+colmOrg[ultEnResIzq])
                        //console.log("derecha: "+colmOrg[colmDerec])
                        colmOrg[i] = [...Resolver(op, colmOrg[ultEnResIzq],colmOrg[colmDerec], filas, colmOrg[i][0])];
                    }
                }
                else if (colmOrg[i+1][1] !== undefined) {//
                    let colmIzq = i-1;
                    let op = QueOperador(colmOrg[i][0]);
                    ////console.log("Derecha es la derecha izq es la izq sin complicaciones")
                    if( colmOrg[colmIzq][1]!==undefined){
                        ////console.log("izquierda: "+colmOrg[colmIzq])
                        ////console.log("derecha: "+colmOrg[colmDerec])
                        colmOrg[i] = [...Resolver(op, colmOrg[colmIzq],colmOrg[i+1], filas, colmOrg[i][0])];
                    }
                }
                else {
                    //console.log("no esta lleno derecha ni izq en op solo");
                    //console.log(colmOrg[i+1]);
                    //console.log(colmOrg[i-1])
                }
                continue;
            }
            else if(/NOT/.test(colmOrg[i][0])){
                //descubrir que letra tenemos, cual columna es y mandar esa columna 
                let derec = [];
                ////console.log("Pasa tercera: "+colmOrg[i][0]);
                let columna = NumeroColumnaDePP(colmOrg[i][0],pp);
                ////console.log("columna aca en medio de todo para NOT "+cantColm+" : "+colmOrg[i][0])
                ////console.log("columnapp: "+columna.izquierda)
                if (columna.izquierda !== null && columna.izquierda >= 0 && Array.isArray(colmOrg[columna.izquierda])) {
                    derec=[...colmOrg[columna.izquierda]];
                    ////console.log("columna derecha todo es de not y algo: ")
                    ////console.log(derec)
                }
                //resolvemos 
                colmOrg[i]= Resolver("NOT",null,derec,filas,colmOrg[i][0]);
                ////console.log("resultado not algo en columna: "+colmOrg[i][0])
                ////console.log(colmOrg[i]);
            }
            else if(colmOrg[i][0]==="=c"){
                let sinLlenar=0;
                for (let j=0; j< colmOrg.length-1; j++){//vemos si la tabla esta llena
                    if(colmOrg[j][1]!==undefined){

                    }
                    else{
                        sinLlenar++;
                        break;//terminar el for
                    }
                }
                if(sinLlenar===0){
                    //verificar quien es el ultimo en resolver para poner lo mismo aqui
                    let numeColumna = UltimaColumnaEnResolver(colmOrg,0,colmOrg.length-1,1);
                    //console.log("array orden de c=");
                    //console.log(nose)
                    //console.log("numero que manda el ultcoml: "+numeColumna)
                    ////console.log("Ultma en la tabla osea c=")
                    ////console.log(numeColumna)
                    if(isNaN(numeColumna)){
                        return colmOrg[i];
                    }else{
                        //console.log("C= columna: ")
                        //console.log(colmOrg[numeColumna]);
                        colmOrg[i]=[...colmOrg[numeColumna]];
                        termino=true;
                        if(tablaSi===0){//si modo tabla le ponemos encabexado =c 
                            colmOrg[i][0]="=c";
                        }else{
                            console.log("tabla especial")
                            console.log(colmOrg);
                            return colmOrg[i];//si no retornamos el puro resultado 
                        }
                    }
                    
                }
            }
            else{
                let abreEn = DondeAbreParentesis(i, colmOrg); 
                let cerradoEn = DondeCierraParentesis(i, colmOrg);
                if(abreEn===ap4){//se hace null pq pues realmente solo ocupariamos esa colm y nos saltamos eso pero igual aqui hacemos el NOT 
                    abreEn = null;
                    ////console.log("Abre en se cancela")
                }
                if(cerradoEn===ap){
                    cerradoEn = null;
                    ////console.log("Cerrado en se cancela")
                }
                if(/^AND/.test(colmOrg[i][0])||/^OR/.test(colmOrg[i][0])||/^THEN/.test(colmOrg[i][0])
                    ||/^IF/.test(colmOrg[i][0])){//si estan al inicio: vp)
                    let derec = [];
                    let izq = [];
                    let columna = NumeroColumnaDePP(colmOrg[i][0],pp);
                    let op = columna.operador;
                    //console.log("es pp derecha: "+columna.izquierda);
                    if (columna.izquierda !== null && columna.izquierda >= 0 && Array.isArray(colmOrg[columna.izquierda])) {
                            derec=[...colmOrg[columna.izquierda]];
                            //console.log(colmOrg[columna.izquierda])
                            if(abreEn !== null){//si hay parentesis
                                let ultEnResIzq = UltimaColumnaEnResolver(colmOrg, abreEn, i-1);
                                ////console.log("columna NOT antes del parentesis?: "+colmOrg[abreEn-1][0]);
                                if(colmOrg[abreEn-1][0]==="NOT"){
                                    if(colmOrg[abreEn-1][1]!==undefined){
                                        //console.log("izquierda: "+colmOrg[abreEn-1])
                                        //console.log("derecha: "+derec)
                                        colmOrg[i] = [...Resolver(op, colmOrg[abreEn-1],derec, filas, colmOrg[i][0])];
                                    }
                                }
                                else if( colmOrg[ultEnResIzq][1]!==undefined){
                                    //console.log("izquierda: "+colmOrg[ultEnResIzq])
                                    //console.log("derecha: "+derec)
                                    //console.log("como paso la vrd no se: "+colmOrg[i][0])
                                    colmOrg[i] = [...Resolver(op, colmOrg[ultEnResIzq],derec, filas, colmOrg[i][0])];
                                }
                            }
                            else if(colmOrg[ap4][1]!==undefined){
                                //descubrir que letra tenemos, cual columna es y mandar esa columna 
                                izq = [...colmOrg[ap4]];
                                
                                //resolvemos 
                                colmOrg[i]= [...Resolver(op,izq,derec,filas,colmOrg[i][0])];
                            }
                    }

                    
                }
                else if(/AND$/.test(colmOrg[i][0])||/OR$/.test(colmOrg[i][0])||/THEN$/.test(colmOrg[i][0])
                    ||/IF$/.test(colmOrg[i][0])){//si estan al final: (pv
                    let izq = [];
                    let columna = NumeroColumnaDePP(colmOrg[i][0],pp);
                    let op = columna.operador;
                    if (columna.izquierda !== null && columna.izquierda >= 0 && Array.isArray(colmOrg[columna.izquierda])) {
                        izq=[...colmOrg[columna.izquierda]];
                    }
                    else{
                        throw new Error ("no ha izq en pv ya tu sabe")//este programa no es nada profesional xdd
                    }

                    if (cerradoEn !== null) {
                        let ultEnResDerecha = UltimaColumnaEnResolver(colmOrg, i+1, cerradoEn);

                        if (colmOrg[ultEnResDerecha][1] !== undefined) {
                            
                            if(izq[1] !== undefined){
                                console.log("izquierda: "+izq)
                                console.log("derecha: "+colmOrg[ultEnResDerecha])
                                colmOrg[i] = [...Resolver(op, izq,colmOrg[ultEnResDerecha], filas, colmOrg[i][0])];
                            }
                        }
                        
                    } 
                    else if(colmOrg[ap][1]!==undefined){
                        //descubrir que letra tenemos, cual columna es y mandar esa columna 
                        let derec = [...colmOrg[ap]];
                        
                        //resolvemos 
                        colmOrg[i]= [...Resolver(op,izq,derec,filas,colmOrg[i][0])];
                    }
                }
                else if(/AND/.test(colmOrg[i][0])||/OR/.test(colmOrg[i][0])||/THEN/.test(colmOrg[i][0])
                    ||/IF/.test(colmOrg[i][0])){//esta en el medio: pvq
                    //descubrir que letras tenemos, cual columna es y mandar esa columnas 
                    let derec = [];
                    let izq = [];
                    let columna = NumeroColumnaDePP(colmOrg[i][0],pp);
                    let op = columna.operador;
                    // izquierda
                    if (columna.izquierda !== null && columna.izquierda >= 0 && Array.isArray(colmOrg[columna.izquierda])) {
                        izq = [...colmOrg[columna.izquierda]];
                    }
                    // derecha
                    if (columna.derecha !== null && columna.derecha >= 0 && Array.isArray(colmOrg[columna.derecha])) {
                        derec = [...colmOrg[columna.derecha]];
                    }
                    //resolvemos 
                    colmOrg[i]= [...Resolver(op,izq,derec,filas,colmOrg[i][0])];
                    //resolvemos
                }
            }
        }
    }
    return colmOrg;
}